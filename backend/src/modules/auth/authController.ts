import { inject, injectable } from "tsyringe";
import { Request, Response } from "express";

import AuthService from "./authService";
import { UserDto, UserRegisterDto, UserSignInDto } from "./authDto";
import { instanceToPlain } from "class-transformer";

@injectable()
export default class AuthController {
  constructor(@inject(AuthService) private authService: AuthService) {}

  public getAll = async (req: Request, res: Response): Promise<void> => {
    const users = await this.authService.findAll();
    const data = instanceToPlain(users);
    res.json(data);
  };

  public create = async (req: Request, res: Response): Promise<void> => {
    const data: UserRegisterDto = req.body;

    const userSession: UserDto = await this.authService.create(data);
    const user = instanceToPlain(userSession);
    res.status(201).json(user);
  };

  public signIn = async (req: Request, res: Response): Promise<void> => {
    const data: UserSignInDto = req.body;
    const usersession = await this.authService.signIn(data);
    const plainData = instanceToPlain(usersession);

    res.status(200).json(plainData);
  };
}
