import Server from "./server";

export default class StartUp {
  constructor(protected server: Server = new Server()) {}

  public Init(): Promise<void> {
    return new Promise((resolve) => {
      this.server.Listen(3000, "localhost");
      resolve();
    });
  }
}
