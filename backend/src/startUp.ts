import Server from "./server";

export default class StartUp {
  constructor(protected server: Server = new Server()) {}

  public Init() {
    this.server.start();
  }
}
