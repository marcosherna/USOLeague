import BaseError from "./baseError";

export default class Unauthorized extends BaseError {
  constructor(message: string) {
    super(message, 401, "Unauthorized");
  }
}
