import {
  AccountStatusTypeEnum,
  constants,
  HandleableError,
  IApiMessageResponse,
  ICreateUserBasics,
  IRequestUser,
  ITokenResponse,
  IUserDocument,
  IUserResponse,
  ModelName,
  StringNames,
  translate,
  UserNotFoundError,
  ValidationError,
} from '@chili-and-cilantro/chili-and-cilantro-lib';
import {
  handleError,
  IApplication,
  routeConfig,
  RouteConfig,
} from '@chili-and-cilantro/chili-and-cilantro-node-lib';
import { NextFunction, Request, Response } from 'express';
import { body, query } from 'express-validator';
import { findAuthToken } from '../../middlewares/authenticate-token';
import { JwtService } from '../../services/jwt';
import { RequestUserService } from '../../services/request-user';
import { UserService } from '../../services/user';
import { BaseController } from '../base';

/**
 * Controller for user-related routes
 */
export class UserController extends BaseController {
  private jwtService: JwtService;
  private userService: UserService;

  constructor(application: IApplication) {
    super(application);
    this.jwtService = new JwtService(application);
    this.userService = new UserService(application);
  }

  protected getRoutes(): RouteConfig<unknown[]>[] {
    return [
      routeConfig<unknown[]>({
        method: 'post',
        path: '/change-password',
        handler: this.changePassword,
        useAuthentication: true,
        validation: [
          body('currentPassword')
            .notEmpty()
            .withMessage('Current password is required'),
          body('newPassword')
            .matches(constants.PASSWORD_REGEX)
            .withMessage(constants.PASSWORD_REGEX_ERROR),
        ],
      }),
      routeConfig<unknown[]>({
        method: 'post',
        path: '/register',
        handler: this.register,
        validation: [
          body('username')
            .matches(constants.USERNAME_REGEX)
            .withMessage(constants.USERNAME_REGEX_ERROR),
          body('email').isEmail().withMessage('Invalid email address'),
          body('password')
            .matches(constants.PASSWORD_REGEX)
            .withMessage(constants.PASSWORD_REGEX_ERROR),
          body('timezone').optional().isString(),
        ],
        useAuthentication: false,
      }),
      routeConfig<unknown[]>({
        method: 'post',
        path: '/login',
        handler: this.login,
        validation: [
          body().custom((value, { req }) => {
            if (!req.body.username && !req.body.email) {
              throw new Error('Either username or email is required');
            }
            return true;
          }),
          body('username')
            .optional()
            .matches(constants.USERNAME_REGEX)
            .withMessage(constants.USERNAME_REGEX_ERROR),
          body('email')
            .optional()
            .isEmail()
            .withMessage('Invalid email address'),
          body('password')
            .matches(constants.PASSWORD_REGEX)
            .withMessage(constants.PASSWORD_REGEX_ERROR),
        ],
        useAuthentication: false,
      }),
      routeConfig<unknown[]>({
        method: 'get',
        path: '/refresh-token',
        handler: this.refreshToken,
        useAuthentication: true,
      }),
      routeConfig<unknown[]>({
        method: 'get',
        path: '/verify-email',
        handler: this.verifyEmailToken,
        validation: [
          query('token').not().isEmpty().withMessage('Token is required'),
          query('token')
            .isLength({
              min: constants.EMAIL_TOKEN_LENGTH * 2,
              max: constants.EMAIL_TOKEN_LENGTH * 2,
            })
            .withMessage('Invalid token'),
        ],
        useAuthentication: false,
      }),
      routeConfig<unknown[]>({
        method: 'get',
        path: '/verify',
        handler: this.tokenVerifiedResponse,
        useAuthentication: true,
      }),
      routeConfig<unknown[]>({
        method: 'post',
        path: '/resend-verification',
        handler: this.resendVerification,
        validation: [
          body().custom((value, { req }) => {
            if (!req.body.username && !req.body.email) {
              throw new Error('Either username or email is required');
            }
            return true;
          }),
          body('username').optional().isString(),
          body('email').optional().isEmail(),
        ],
        useAuthentication: false,
      }),
      routeConfig<unknown[]>({
        method: 'post',
        path: '/forgot-password',
        handler: this.forgotPassword,
        validation: [
          body('email')
            .isEmail()
            .normalizeEmail()
            .withMessage('Invalid email address'),
        ],
        useAuthentication: false,
      }),
      routeConfig<unknown[]>({
        method: 'get',
        path: '/verify-reset-token',
        handler: this.verifyResetToken,
        validation: [
          query('token').not().isEmpty().withMessage('Token is required'),
          query('token')
            .isLength({
              min: constants.EMAIL_TOKEN_LENGTH * 2,
              max: constants.EMAIL_TOKEN_LENGTH * 2,
            })
            .withMessage('Invalid token'),
        ],
        useAuthentication: false,
      }),
      routeConfig<unknown[]>({
        method: 'post',
        path: '/reset-password',
        handler: this.resetPassword,
        validation: [
          body('token').notEmpty(),
          body('password')
            .matches(constants.PASSWORD_REGEX)
            .withMessage(constants.PASSWORD_REGEX_ERROR),
        ],
        useAuthentication: false,
      }),
    ];
  }

  /**
   * Change the user's password
   * @param req The request object
   * @param res The response object
   * @param next The next function
   * @returns
   */
  public async changePassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { currentPassword, newPassword } = req.body;
      const userId = req.user?.id;
      if (!userId) {
        handleError(
          new HandleableError(translate(StringNames.Common_Unauthorized), {
            statusCode: 401,
          }),
          res,
          next,
        );
        return;
      }

      await this.userService.changePassword(
        userId,
        currentPassword,
        newPassword,
      );
      this.sendApiMessageResponse(
        200,
        { message: 'Password changed successfully' } as IApiMessageResponse,
        res,
      );
    } catch (error) {
      handleError(error, res, next);
    }
  }

  /**
   * Send the verify token response after authenticateToken middleware
   * @param req
   * @param res
   */
  public async tokenVerifiedResponse(
    req: Request,
    res: Response,
  ): Promise<void> {
    // If we've reached this point, the token is valid
    this.sendApiMessageResponse(
      200,
      { message: 'Token is valid', user: req.user } as IUserResponse,
      res,
    );
  }

  /**
   * Refresh the JWT token
   * @param req
   * @param res
   * @param next
   * @returns
   */
  private async refreshToken(req: Request, res: Response, next: NextFunction) {
    const UserModel = this.application.getModel<IUserDocument>(ModelName.User);
    try {
      const token = findAuthToken(req.headers);
      if (!token) {
        handleError(
          new HandleableError(translate(StringNames.Validation_InvalidToken), {
            statusCode: 422,
          }),
          res,
          next,
        );
        return;
      }

      const tokenUser = await this.jwtService.verifyToken(token);

      const userDoc = await UserModel.findById(tokenUser.userId, {
        password: 0,
      });
      if (
        !userDoc ||
        userDoc.accountStatusType !== AccountStatusTypeEnum.Active
      ) {
        handleError(new UserNotFoundError(), res, next);
        return;
      }
      const { token: newToken } = await this.jwtService.signToken(userDoc);

      res.header('Authorization', `Bearer ${newToken}`);
      res.status(200).json({
        message: 'Token refreshed',
        user: RequestUserService.makeRequestUser(userDoc),
      } as IUserResponse);
    } catch (error) {
      handleError(error, res, next);
    }
  }

  /**
   * Register a new user
   * @param req The request object
   * @param res The response object
   * @param next The next function
   * @returns
   */
  public async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { username, email, password, timezone } = req.body;

      await this.userService.newUser(
        {
          username: username.trim(),
          email: email.trim(),
          timezone: timezone,
        } as ICreateUserBasics,
        password,
      );
      this.sendApiMessageResponse(
        201,
        { message: 'User registered successfully' } as IApiMessageResponse,
        res,
      );
    } catch (error) {
      handleError(error, res, next);
    }
  }

  /**
   * Log in a user
   * @param req The request object
   * @param res The response object
   * @param next The next function
   * @returns
   */
  public async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { username, email, password } = req.body;

      const userDoc = await this.userService.findUser(
        password,
        email,
        username,
      );

      const { token } = await this.jwtService.signToken(userDoc);

      userDoc.lastLogin = new Date();
      await userDoc.save();

      res
        .status(200)
        .json({ token, message: 'Logged in successfully' } as ITokenResponse);
    } catch (error) {
      handleError(error, res, next);
    }
  }

  /**
   * Verify an email token
   * @param req The request object
   * @param res The response object
   * @param next The next function
   * @returns
   */
  public async verifyEmailToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const emailToken = Array.isArray(req.query.token)
      ? req.query.token[0]
      : req.query.token;

    if (
      typeof emailToken !== 'string' ||
      emailToken.length !== constants.EMAIL_TOKEN_LENGTH * 2
    ) {
      handleError(
        new ValidationError(translate(StringNames.Validation_InvalidToken)),
        res,
        next,
      );
      return;
    }

    try {
      await this.userService.verifyEmailTokenAndFinalize(emailToken);

      this.sendApiMessageResponse(
        200,
        { message: 'Email verified successfully' } as IApiMessageResponse,
        res,
      );
    } catch (error) {
      handleError(error, res, next);
    }
  }

  /**
   * Resend the verification email
   * @param req The request object
   * @param res The response object
   * @param next The next function
   */
  public async resendVerification(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const UserModel = this.application.getModel<IUserDocument>(ModelName.User);
    try {
      const { username, email } = req.body;

      // Find the user
      const user = await UserModel.findOne(username ? { username } : { email });
      if (!user) {
        handleError(new UserNotFoundError(), res, next);
        return;
      }

      // Resend the email token
      await this.userService.resendEmailToken(user._id.toString());

      this.sendApiMessageResponse(
        200,
        {
          message: 'Verification email resent successfully',
        } as IApiMessageResponse,
        res,
      );
    } catch (error) {
      handleError(error, res, next);
    }
  }

  /**
   * Send a password reset email
   * @param req The request object
   * @param res The response object
   * @param next The next function
   * @returns
   */
  public async forgotPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { email } = req.body;
      const result = await this.userService.initiatePasswordReset(email);

      this.sendApiMessageResponse(
        result.success ? 200 : 400,
        { message: result.message } as IApiMessageResponse,
        res,
      );
    } catch (error) {
      handleError(error, res, next);
    }
  }

  /**
   * Verify the password reset token
   * @param req The request object
   * @param res The response object
   * @param next The next function
   */
  public async verifyResetToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { token } = req.query;
      await this.userService.verifyEmailToken(token as string);
      this.sendApiMessageResponse(
        200,
        { message: 'Token is valid' } as IApiMessageResponse,
        res,
      );
    } catch (error) {
      handleError(error, res, next);
    }
  }

  /**
   * Reset the user's password
   * @param req The request object
   * @param res The response object
   * @param next The next function
   */
  public async resetPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { token, password } = req.body;
      const user = await this.userService.resetPassword(token, password);

      // Generate a new JWT token for the user
      const { token: newToken } = await this.jwtService.signToken(user);
      const requestUser: IRequestUser =
        RequestUserService.makeRequestUser(user);
      res.header('Authorization', `Bearer ${newToken}`);
      res.status(200).json({
        message: 'Password reset successfully',
        user: requestUser,
      } as IUserResponse);
    } catch (error) {
      handleError(error, res, next);
    }
  }
}
