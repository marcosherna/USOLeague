import { DataSource } from "typeorm";
import { inject, singleton } from "tsyringe";

import Server from "./server";

@singleton()
export default class StartUp {
  constructor(
    @inject(Server) protected server: Server,
    @inject(DataSource) protected database: DataSource
  ) {}

  public async Init(): Promise<void> {
    await this.database.initialize();
    this.server.Listen(3000, "localhost");
  }
}
