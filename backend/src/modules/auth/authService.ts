import { inject, injectable } from "tsyringe";
import { plainToInstance } from "class-transformer";
import { Repository } from "typeorm";

import UserRepository from "../../database/repositories/userRepository";
import { User } from "../../database/models/User";

import BadRequest from "../../errors/badRequest";
import NotFound from "../../errors/notFound";
import Unauthorized from "../../errors/unauthorized";
import Conflict from "../../errors/conflict";
import { UserDto, UserRegisterDto, UserSignInDto } from "./authDto";

@injectable()
export default class AuthService {
  constructor(
    @inject(Repository<User>) private userRepository: UserRepository
  ) {}

  async create(user: UserRegisterDto): Promise<UserDto> {
    const isExist = await this.userRepository.existByEmail(user.email);

    if (isExist) throw new Conflict("El usuario ya existe");

    if (user.isLocal() && !user.password)
      throw new BadRequest("La contraseña es requerida para usuarios locales", [
        { field: "password", errors: ["Is required"] },
      ]);

    if (!user.isLocal() && !user.providerId)
      throw new BadRequest(
        "El providerId es requerido para proveedores externos",
        [{ field: "providerId", errors: ["Is required"] }]
      );

    const entity = plainToInstance(User, user);

    const newUser = await this.userRepository.save(entity);

    return plainToInstance(UserDto, newUser);
  }

  async signIn(user: UserSignInDto): Promise<UserDto> {
    if (user.isLocal() && (!user.password || user.password.trim() === ""))
      throw new BadRequest("Password is required for local provider", [
        { field: "password", errors: ["not empty", "required"] },
      ]);

    const userSession = await this.userRepository.findByEmailAndProvider(
      user.authProvider,
      user.email
    );

    if (!userSession) throw new NotFound("User not found");

    if (!user.isLocal() && (!user.providerId || user.providerId.trim() === ""))
      throw new BadRequest("Provider id is required for auth provider", [
        { field: "provider_id", errors: ["Not empty", "Is required"] },
      ]);

    if (user.isLocal()) {
      // TODO: validate credentials
      // const isValid = await bcrypt.compare(password!, user.password);
      // if (!isValid) throw new Error("Invalid credentials")
      if (userSession.password !== user.password)
        throw new Unauthorized("Invalid password");
    }

    return plainToInstance(UserDto, userSession);
  }

  async findAll(): Promise<UserDto[]> {
    const users = await this.userRepository.find();
    return plainToInstance(UserDto, users);
  }
}
