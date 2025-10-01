import { inject, injectable } from "tsyringe";

import BaseRouter from "../utils/baseRouter";
import AuthRouter from "../modules/auth/authRouter";

@injectable()
export default class ApiRoute extends BaseRouter {
  constructor(@inject(AuthRouter) authRouter: AuthRouter) {
    super("/api");

    this.router.use(authRouter.getPath(), authRouter.getRouter());
  }
}
