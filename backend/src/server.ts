import express, { Application } from "express";
import { singleton, inject } from "tsyringe";
import cors from "cors";

import BaseRouter from "./utils/baseRouter";
import ApiRoute from "./routers/apiRouter";

@singleton()
export default class Server {
  protected api: Application;

  constructor(@inject(ApiRoute) private apiRouter: BaseRouter) {
    this.api = express();
    this.api.use(express.urlencoded({ extended: true }));
    this.api.use(express.json());
    this.api.use(cors());
    this.api.use(this.apiRouter.getPath(), this.apiRouter.getRouter());
  }

  public Listen(port: number, host: string): void {
    this.api.listen(port, host, () => {
      console.log(`Server is running on http://${host}:${port}`);
    });
  }
}
