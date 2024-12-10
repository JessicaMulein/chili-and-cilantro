import {
  HandleableError,
  IApiErrorResponse,
  IApiExpressValidationErrorResponse,
  IApiMongoValidationErrorResponse,
  StringNames,
  TransactionCallback,
  translate,
} from '@chili-and-cilantro/chili-and-cilantro-lib';
import { NextFunction, Request, Response } from 'express';
import { ClientSession, Connection, Types } from 'mongoose';
import { ExpressValidationError } from './errors/express-validation-error';
import { MissingValidatedDataError } from './errors/missing-validated-data';
import { MongooseValidationError } from './errors/mongoose-validation-error';

/**
 * Checks if the given id is a valid string id
 * @param id The id to check
 * @returns True if the id is a valid string id
 */
export function isValidStringId(id: unknown): boolean {
  return typeof id === 'string' && Types.ObjectId.isValid(id);
}

/**
 * Verifies the required fields were validated by express-validator and sends an error response if not or calls the callback if they are
 * @param req The request object
 * @param res The response object
 * @param fields The fields to check
 * @param callback The callback to call if the fields are valid
 * @param errorCallback The function to call if a field is invalid
 * @returns The result of the callback
 */
export async function requireValidatedFieldsAsync<T = void>(
  req: Request,
  res: Response,
  fields: string[],
  callback: () => Promise<T>,
  errorCallback: (res: Response, field: string) => void,
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    if (req.validatedBody === undefined) {
      reject(new MissingValidatedDataError());
      return;
    }

    const validatedBody = req.validatedBody;
    for (const field of fields) {
      if (validatedBody[field] === undefined) {
        errorCallback(res, field);
        reject(new MissingValidatedDataError(field));
        return;
      }
    }

    // All fields are valid, call the callback
    callback().then(resolve).catch(reject);
  });
}

/**
 * Verifies at least one of the required fields were validated by express-validator and sends an error response if not or calls the callback if they are
 * @param req The request object
 * @param res The response object
 * @param fields The fields to check
 * @param callback The callback to call if the fields are valid
 * @param errorCallback The function to call if not at least one field is valid
 * @returns The result of the callback
 */
export async function requireOneOfValidatedFieldsAsync<T = Promise<void>>(
  req: Request,
  res: Response,
  fields: string[],
  callback: () => Promise<T>,
  errorCallback: (res: Response, fields: string[]) => void,
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    if (req.validatedBody === undefined) {
      throw new Error('No validated body found on the request');
    }
    const validatedBody = req.validatedBody;
    // return 422 if none of the fields are valid
    if (!fields.some((field) => validatedBody[field] !== undefined)) {
      errorCallback(res, fields);
      reject(new MissingValidatedDataError(fields));
      return;
    }
    // All fields are valid, call the callback
    callback().then(resolve).catch(reject);
  });
}

/**
 * Verifies the required fields were validated by express-validator and throws an error if not or calls the callback if they are
 * @param req The request object
 * @param fields The fields to check
 * @param callback The callback to call if the fields are valid
 * @returns The result of the callback
 */
export function requireValidatedFieldsOrThrow<T = void>(
  req: Request,
  fields: string[],
  callback: () => T,
): T {
  if (req.validatedBody === undefined) {
    throw new Error('No validated body found on the request');
  }
  const validatedBody = req.validatedBody;
  fields.forEach((field) => {
    if (validatedBody[field] === undefined) {
      throw new MissingValidatedDataError(field);
    }
  });
  return callback();
}

/**
 * Wraps a callback in a transaction if necessary
 * @param connection The mongoose connection
 * @param useTransaction Whether to use a transaction
 * @param session The session to use
 * @param callback The callback to wrap
 * @param args The arguments to pass to the callback
 * @returns The result of the callback
 */
export async function withTransaction<T>(
  connection: Connection,
  useTransaction: boolean,
  session: ClientSession | undefined,
  callback: TransactionCallback<T>,
  ...args: any
): Promise<T> {
  if (!useTransaction) {
    return await callback(session, undefined, ...args);
  }
  const needSession = useTransaction && session === undefined;
  const client = connection.getClient();
  const s = needSession ? await client.startSession() : session;
  try {
    if (needSession && s !== undefined) await s.startTransaction();
    const result = await callback(s, ...args);
    if (needSession && s !== undefined) await s.commitTransaction();
    return result;
  } catch (error) {
    if (needSession && s !== undefined && s.inTransaction())
      await s.abortTransaction();
    throw error;
  } finally {
    if (needSession && s !== undefined) await s.endSession();
  }
}

export function handleError(
  error: unknown,
  res: Response,
  next: NextFunction,
): void {
  let handleableError: HandleableError;
  let alreadyHandled = false;
  if (error instanceof HandleableError) {
    handleableError = error;
    alreadyHandled = error.handled;
  } else if (error instanceof Error) {
    handleableError = new HandleableError(error.message, {
      cause: error,
      handled: true,
    });
  } else {
    handleableError = new HandleableError(
      (error as any).message ?? translate(StringNames.Common_UnexpectedError),
      { sourceData: error },
    );
  }
  if (!res.headersSent) {
    if (error instanceof ExpressValidationError) {
      res.status(handleableError.statusCode).json({
        message: translate(StringNames.ValidationError),
        errors: error.errors,
      } as IApiExpressValidationErrorResponse);
    } else if (error instanceof MongooseValidationError) {
      res.status(handleableError.statusCode).json({
        message: translate(StringNames.ValidationError),
        errors: error.errors,
      } as IApiMongoValidationErrorResponse);
    } else {
      res.status(handleableError.statusCode).json({
        message: handleableError.message,
        error: handleableError,
      } as IApiErrorResponse);
    }
    handleableError.handled = true;
  }
  if (!alreadyHandled) {
    handleableError.handled = true;
    next(handleableError);
  }
}
