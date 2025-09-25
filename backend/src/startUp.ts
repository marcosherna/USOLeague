import Server from "./server";
import { inject, singleton } from "tsyringe";

@singleton()
export default class StartUp {
  constructor(@inject(Server) protected server: Server) {}

  public Init(): Promise<void> {
    return new Promise((resolve) => {
      this.server.Listen(3000, "localhost");
      resolve();
    });
  }
}
