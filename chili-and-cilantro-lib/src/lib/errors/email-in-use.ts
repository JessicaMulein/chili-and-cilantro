import { HandleableError } from './handleable-error';

export class EmailInUseError extends HandleableError {
  constructor() {
    super('Email is already in use', { statusCode: 400 });
    this.name = 'EmailInUseError';
    Object.setPrototypeOf(this, EmailInUseError.prototype);
  }
}
