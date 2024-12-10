import { HandleableError } from './handleable-error';

export class UserNotFoundError extends HandleableError {
  constructor() {
    super('User not found', { statusCode: 404 });
    this.name = 'UserNotFound';
    Object.setPrototypeOf(this, UserNotFoundError.prototype);
  }
}
