import { Result, ValidationError } from 'express-validator';
import { IApiMessageResponse } from './api-message-response';

export interface IApiExpressValidationErrorResponse
  extends IApiMessageResponse {
  errors: ValidationError[] | Result<ValidationError>;
}
