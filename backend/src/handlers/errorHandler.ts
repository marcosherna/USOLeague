import { Request, Response, NextFunction } from "express";
import BaseError from "../errors/baseError";

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err) {
    const isKnownError = err instanceof BaseError;
    const status = isKnownError && err.code ? err.code : 500;
    const message = isKnownError ? err.message : "Internal server error";
    const stackTrace = process.env.NODE_ENV === "production" ? null : err.stack;

    res.status(status).json({
      message,
      ...(isKnownError && err instanceof BaseError ? err.toJSON() : {}),
      stack: stackTrace,
    });
  }
  next();
}
