export class RequestError extends Error {
  constructor(message = "", ...args) {
    super(message, ...args);
    this.message = message;
  }
}
