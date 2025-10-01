import { inject, injectable } from "tsyringe";
import { Repository } from "typeorm";

import UserRepository from "../../database/repositories/userRepository";
import { User } from "../../database/models/User";

@injectable()
export default class AuthService {
  constructor(
    @inject(Repository<User>) private userRepository: UserRepository
  ) {}

  async create(user: User): Promise<User> {
    // TODO: mapper DTO to entity
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}
