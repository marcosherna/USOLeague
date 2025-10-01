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

  public create = async (req: Request, res: Response): Promise<Response> => {
    const data = req.body;
    const user = await this.authService.create(data);
    return res.status(201).json(user);
  };

  public signIn = async (req: Request, res: Response): Promise<Response> => {
    const { authProvider, email, password } = req.body;
    const usersession = await this.authService.signIn(
      authProvider,
      email,
      password
    );
    return res.status(200).json(usersession);
  };
}
