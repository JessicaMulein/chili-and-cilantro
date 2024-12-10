import { HandleableError } from './handleable-error';

export class EmailTokenExpiredError extends HandleableError {
  constructor() {
    super('Verification link has expired. Please request a new one.', {
      statusCode: 400,
    });
    this.name = 'EmailTokenExpiredError';
    Object.setPrototypeOf(this, EmailTokenExpiredError.prototype);
  }
}
