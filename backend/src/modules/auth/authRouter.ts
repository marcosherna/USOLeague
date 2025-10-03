import { inject, injectable } from "tsyringe";

import BaseRouter from "../../utils/baseRouter";
import AuthController from "./authController";
import asyncHandler from "../../handlers/asyncHandler";

@injectable()
export default class AuthRouter extends BaseRouter {
  constructor(@inject(AuthController) private authController: AuthController) {
    super("/auth");
    this.router.get("/", asyncHandler(this.authController.getAll));
    this.router.post("/sign-in", asyncHandler(this.authController.signIn));
    this.router.post("/register", asyncHandler(this.authController.create));
  }
}
