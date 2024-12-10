import { HandleableError } from './handleable-error';

export class InvalidTokenError extends HandleableError {
  constructor() {
    super('Invalid token', { statusCode: 400 });
    this.name = 'InvalidTokenError';
    Object.setPrototypeOf(this, InvalidTokenError.prototype);
  }
}
