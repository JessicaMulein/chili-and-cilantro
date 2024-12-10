import { HandleableError } from './handleable-error';

export class InvalidCredentialsError extends HandleableError {
  constructor() {
    super('Invalid credentials', { statusCode: 401 });
    this.name = 'InvalidCredentialsError';
    Object.setPrototypeOf(this, InvalidCredentialsError.prototype);
  }
}
