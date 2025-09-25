import { Router } from "express";

export default class BaseRouter {
  constructor(protected path: string, protected router: Router = Router()) {}

  public getPath(): string {
    return this.path;
  }

  public getRouter(): Router {
    return this.router;
  }
}
