import { HandleableError } from './handleable-error';

export class AccountDeletedError extends HandleableError {
  constructor() {
    super('Account has been deleted', { statusCode: 404 });
    this.name = 'AccountDeletedError';
    Object.setPrototypeOf(this, AccountDeletedError.prototype);
  }
}
