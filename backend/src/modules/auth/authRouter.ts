import { inject, injectable } from "tsyringe";

import BaseRouter from "../../utils/baseRouter";
import AuthController from "./authController";
import asyncHandler from "../../handlers/asyncHandler";
import { validateDto } from "../../middlewares/validateDto";
import { RegisterDto } from "./authDto";

@injectable()
export default class AuthRouter extends BaseRouter {
  constructor(@inject(AuthController) private authController: AuthController) {
    super("/auth");
    this.router.get("/", asyncHandler(this.authController.getAll));
    this.router.post("/sign-in", asyncHandler(this.authController.signIn));
    this.router.post(
      "/register",
      validateDto(RegisterDto),
      asyncHandler(this.authController.create)
    );
  }
}
