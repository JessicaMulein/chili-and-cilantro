import {
  buildNestedI18nForLanguage,
  languageCodeToStringLanguages,
  LanguageCodeValues,
} from '@chili-and-cilantro/chili-and-cilantro-lib';
import {
  handleError,
  routeConfig,
  RouteConfig,
} from '@chili-and-cilantro/chili-and-cilantro-node-lib';
import { NextFunction, Request, Response } from 'express';
import { param } from 'express-validator';
import { BaseController } from '../base';

export class I18nController extends BaseController {
  public getRoutes(): RouteConfig<any>[] {
    return [
      routeConfig<any>({
        method: 'get',
        path: '/:languageCode',
        handler: this.i18n,
        useAuthentication: false,
        validation: [
          param('languageCode')
            .custom((value: string) => {
              // value must be one of the valid language codes from LanguageCodes
              return LanguageCodeValues.includes(value);
            })
            .withMessage('Invalid language code'),
        ],
      }),
    ];
  }

  private async i18n(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { languageCode } = req.params;

    try {
      const language = languageCodeToStringLanguages(languageCode);
      const i18nTable = buildNestedI18nForLanguage(language);
      res.status(200).json(i18nTable);
    } catch (error) {
      handleError(error, res, next);
    }
  }
}
