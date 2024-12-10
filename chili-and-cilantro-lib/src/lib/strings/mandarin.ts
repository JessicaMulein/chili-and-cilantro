import { StringNames } from '../enumerations/string-names';
import { StringsCollection } from '../shared-types';

const site = '辣椒和香菜';

export const MandarinStrings: StringsCollection = {
  [StringNames.Common_ChangePassword]: '更改密码',
  [StringNames.Common_Dashboard]: '仪表板',
  [StringNames.Common_Site]: site,
  [StringNames.Common_Unauthorized]: '未经授权',
  [StringNames.Common_UnexpectedError]: '意外错误',
  [StringNames.ForgotPassword_Title]: '忘记密码',
  [StringNames.Login_LoginButton]: '登录',
  [StringNames.LogoutButton]: '注销',
  [StringNames.RegisterButton]: '注册',
  [StringNames.ValidationError]: '验证错误',
  [StringNames.Validation_InvalidToken]: '无效令牌',
};

export default MandarinStrings;
