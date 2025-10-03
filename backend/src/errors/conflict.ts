import BaseError from "./baseError";

export default class Conflict extends BaseError {
  constructor(message: string) {
    super(message, 409, "Conflict");
  }
}
