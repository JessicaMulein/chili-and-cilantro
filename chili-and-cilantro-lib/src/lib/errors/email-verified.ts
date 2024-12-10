import { HandleableError } from './handleable-error';

export class EmailVerifiedError extends HandleableError {
  constructor() {
    super('Email has already been verified', { statusCode: 400 });
    this.name = 'EmailVerifiedError';
    Object.setPrototypeOf(this, EmailVerifiedError.prototype);
  }
}
