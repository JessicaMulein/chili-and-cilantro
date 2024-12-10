import constants from '../constants';
import { HandleableError } from './handleable-error';

export class InvalidPasswordError extends HandleableError {
  constructor() {
    super(constants.PASSWORD_REGEX_ERROR, { statusCode: 401 });
    this.name = 'InvalidPassword';
    Object.setPrototypeOf(this, InvalidPasswordError.prototype);
  }
}
