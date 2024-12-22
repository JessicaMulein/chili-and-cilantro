import { AccountStatusTypeEnum } from '../enumerations/account-status-type';
import { HandleableError } from './handleable-error';

export abstract class AccountStatusError extends HandleableError {
  constructor(
    accountStatus: AccountStatusTypeEnum,
    message: string,
    statusCode = 403,
  ) {
    super(message, { statusCode: statusCode });
    this.name = 'AccountStatusError';
    Object.setPrototypeOf(this, AccountStatusError.prototype);
  }
}