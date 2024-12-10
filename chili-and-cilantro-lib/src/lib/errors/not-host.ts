import { HandleableError } from './handleable-error';

export class NotHostError extends HandleableError {
  constructor() {
    super(`User is not the game host`, { statusCode: 422 });
    Object.setPrototypeOf(this, NotHostError.prototype);
  }
}
