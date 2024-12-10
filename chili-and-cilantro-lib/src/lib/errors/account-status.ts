import { AccountStatusTypeEnum } from '../enumerations/account-status-type';
import { HandleableError } from './handleable-error';

export class AccountStatusError extends HandleableError {
  constructor(accountStatus: AccountStatusTypeEnum) {
    super(`Account status is ${accountStatus}`, { statusCode: 403 });
    this.name = 'AccountStatusError';
    Object.setPrototypeOf(this, AccountStatusError.prototype);
  }
}
