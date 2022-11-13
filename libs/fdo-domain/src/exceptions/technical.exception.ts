export class TechnicalException extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}
