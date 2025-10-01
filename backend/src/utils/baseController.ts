import { Request, Response } from "express";
import { Repository, ObjectLiteral} from "typeorm";

export default class BaseController<TModel extends ObjectLiteral> {
  constructor(protected repository: Repository<TModel>) {} // TODO: replace with generic service

  async create(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }

  async readById(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }

  async read(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }

  async update(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }

  async delete(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
}
