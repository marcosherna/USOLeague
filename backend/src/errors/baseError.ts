export default class BaseError extends Error {
  constructor(message: string, public code: number, nameError: string) {
    super(message);
    this.name = nameError;
  }

  public toJSON(): JSON {
    return JSON.parse(
      JSON.stringify({
        status_code: this.code,
        name: this.name,
        message: this.message,
        stack: this.stack,
        cause: this.cause,
      })
    );
  }
}
