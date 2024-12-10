import { ValidationError } from './validation-error';

export class UsernameOrEmailRequiredError extends ValidationError {
  constructor() {
    super('Either username or email is required');
    this.name = 'UsernameOrEmailRequiredError';
    Object.setPrototypeOf(this, UsernameOrEmailRequiredError.prototype);
  }
}
