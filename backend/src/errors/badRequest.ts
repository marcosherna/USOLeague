import BaseError from "./baseError";

export default class BadRequest extends BaseError {
  constructor(message: string) {
    super(message, 400, "Bad request");
  }
}
