import { Request, Response, NextFunction } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

import BadRequest from "../errors/badRequest";
import { ValidationError } from "../errors/validationError";

export function validateDto(dtoClass: any) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const dtoObj = plainToInstance(dtoClass, req.body);
    const errors = await validate(dtoObj, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      const formattedErrors = errors.map(
        (err: any) =>
          ({
            field: err.property,
            errors: Object.values(err.constraints || {}),
          } as ValidationError)
      );

      return next(new BadRequest("Validation failed", formattedErrors));
    }

    req.body = dtoObj;
    next();
  };
}
