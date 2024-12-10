import { StringNames } from '../enumerations/string-names';
import { StringsCollection } from '../shared-types';

const site = 'Чілі та Коріандр';

export const UkrainianStrings: StringsCollection = {
  [StringNames.Common_ChangePassword]: 'Змінити пароль',
  [StringNames.Common_Dashboard]: 'Панель',
  [StringNames.Common_Site]: site,
  [StringNames.Common_Unauthorized]: 'Немає авторизації',
  [StringNames.Common_UnexpectedError]: 'Неочікувана помилка',
  [StringNames.ForgotPassword_Title]: 'Забули пароль',
  [StringNames.Login_LoginButton]: 'Увійти',
  [StringNames.LogoutButton]: 'Вийти',
  [StringNames.RegisterButton]: 'Зареєструватися',
  [StringNames.ValidationError]: 'Помилка валідації',
  [StringNames.Validation_InvalidToken]: 'Недійсний токен',
};

export default UkrainianStrings;
