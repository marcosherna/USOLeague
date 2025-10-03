import { inject, injectable } from "tsyringe";

import BaseRouter from "../../utils/baseRouter";
import AuthController from "./authController";

@injectable()
export default class AuthRouter extends BaseRouter {
  constructor(@inject(AuthController) private authController: AuthController) {
    super("/auth");
    this.router.get("/", this.authController.getAll);
    this.router.post("/sign-in", this.authController.signIn);  
    this.router.post("/register", this.authController.create);
  }
}
