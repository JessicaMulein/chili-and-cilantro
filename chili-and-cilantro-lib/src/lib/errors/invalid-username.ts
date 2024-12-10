import constants from '../constants';
import { HandleableError } from './handleable-error';

export class InvalidUsernameError extends HandleableError {
  constructor() {
    super(constants.USERNAME_REGEX_ERROR, { statusCode: 400 });
    this.name = 'InvalidUsernameError';
    Object.setPrototypeOf(this, InvalidUsernameError.prototype);
  }
}
