import { inject, injectable } from "tsyringe";
import { Request, Response } from "express";

import AuthService from "./authService";

@injectable()
export default class AuthController {
  constructor(@inject(AuthService) private authService: AuthService) {}

  public getAll = async (req: Request, res: Response): Promise<Response> => {
    const users = await this.authService.findAll();
    return res.json(users);
  };
}
