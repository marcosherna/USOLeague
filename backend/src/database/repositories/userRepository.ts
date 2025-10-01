import { Repository, DataSource } from "typeorm";
import { inject, injectable } from "tsyringe";

import { User } from "../models/User";

@injectable({ token: Repository<User> })
export default class UserRepository extends Repository<User> {
  constructor(@inject(DataSource) dataSource: DataSource) {
    super(User, dataSource.manager);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User | null> {
    return this.findOne({ where: { id } });
  }
}
