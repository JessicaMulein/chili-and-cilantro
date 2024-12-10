import { HandleableError } from './handleable-error';

export class EmailTokenUsedOrInvalidError extends HandleableError {
  constructor() {
    super('Email verification link has already been used or is invalid', {
      statusCode: 400,
    });
    this.name = 'EmailTokenUsedOrInvalidError';
    Object.setPrototypeOf(this, EmailTokenUsedOrInvalidError.prototype);
  }
}
