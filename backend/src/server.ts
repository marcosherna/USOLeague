import express, { Application } from "express";

import BaseRouter from "./utils/baseRouter";
import ApiRoute from "./routers/apiRouter";

export default class Server {
  protected api: Application;

  constructor(private apiRouter: BaseRouter = new ApiRoute()) {
    this.api = express();
    this.api.use(this.apiRouter.getPath(), this.apiRouter.getRouter());
  }

  public Listen(port: number, host: string): void {
    this.api.listen(port, host, () => {
      console.log(`Server is running on http://${host}:${port}`);
    });
  }
}
