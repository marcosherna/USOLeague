import BaseError from "./baseError";
import { ValidationError } from "./validationError";

export default class BadRequest extends BaseError {
  constructor(message: string, public errors: ValidationError[] = []) {
    super(message, 400, "Bad request");
  }

  public override toJSON(): JSON {
    return JSON.parse(
      JSON.stringify({
        ...super.toJSON(),
        error: this.errors,
      })
    );
  }
}
