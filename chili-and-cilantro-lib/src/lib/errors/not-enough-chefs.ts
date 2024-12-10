import { HandleableError } from './handleable-error';

export class NotEnoughChefsError extends HandleableError {
  constructor(present: number, minChefs: number) {
    super(`Not enough chefs to start game. ${present}/${minChefs}`, {
      statusCode: 422,
    });
    Object.setPrototypeOf(this, NotEnoughChefsError.prototype);
  }
}
