import { inject, injectable } from "tsyringe";
import { Request, Response } from "express";

import AuthService from "./authService";
import { RegisterDto } from "./authDto";

@injectable()
export default class AuthController {
  constructor(@inject(AuthService) private authService: AuthService) {}

  public getAll = async (req: Request, res: Response): Promise<void> => {
    const users = await this.authService.findAll();
    res.json(users);
  };

  public create = async (req: Request, res: Response): Promise<void> => {
    const data: RegisterDto = req.body;
    const user = await this.authService.create(data);
    res.status(201).json(user);
  };

  public signIn = async (req: Request, res: Response): Promise<void> => {
    const { authProvider, email, password } = req.body;
    const usersession = await this.authService.signIn(
      authProvider,
      email,
      password
    );
    res.status(200).json(usersession);
  };
}
