import { inject, injectable } from "tsyringe";
import { plainToInstance } from "class-transformer";
import { Repository } from "typeorm";

import UserRepository from "../../database/repositories/userRepository";
import { User, userAuthProvider } from "../../database/models/User";

import BadRequest from "../../errors/badRequest";
import NotFound from "../../errors/notFound";
import Unauthorized from "../../errors/unauthorized";
import Conflict from "../../errors/conflict";
import { RegisterDto } from "./authDto";

@injectable()
export default class AuthService {
  constructor(
    @inject(Repository<User>) private userRepository: UserRepository
  ) {}

  async create(user: RegisterDto): Promise<User> {
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
    const objUser = plainToInstance(User, user);
    const newUser = this.userRepository.create(objUser);
    return await this.userRepository.save(newUser);
  }

  async signIn(
    authProvider: string,
    email: string,
    password: string | null = null
  ) {
    const provider = authProvider as userAuthProvider;

    const validateProvider: userAuthProvider[] = [
      "local",
      "google",
      "microsoft",
    ];

    if (!validateProvider.includes(provider))
      // TODO: validate in DTo
      throw new BadRequest("Invalid provider");

    if (provider === "local" && (!password || password.trim() === ""))
      throw new BadRequest("Password is required for local provider");

    const user = await this.userRepository.findByEmailAndProvider(
      provider,
      email
    );

    if (!user) throw new NotFound("User not found");

    if (provider === "local") {
      // TODO: validate credentials
      // const isValid = await bcrypt.compare(password!, user.password);
      // if (!isValid) throw new Error("Invalid credentials")
      if (user.password !== password)
        throw new Unauthorized("Invalid password");
    }

    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
}
