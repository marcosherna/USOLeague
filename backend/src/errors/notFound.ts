import BaseError from "./baseError";

export default class NotFound extends BaseError {
  constructor(message: string) {
    super(message, 404, "Not found");
  }
}
