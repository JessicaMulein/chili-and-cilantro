import { ValidationError } from './validation-error';

export class UsernameInUseError extends ValidationError {
  constructor() {
    super('Username is already in use');
    this.name = 'UsernameInUseError';
    Object.setPrototypeOf(this, UsernameInUseError.prototype);
  }
}
