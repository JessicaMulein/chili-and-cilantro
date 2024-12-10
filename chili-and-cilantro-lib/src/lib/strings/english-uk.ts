import { StringNames } from '../enumerations/string-names';
import { StringsCollection } from '../shared-types';

const site = 'Chili and Cilantro';

export const BritishEnglishStrings: StringsCollection = {
  [StringNames.Common_ChangePassword]: 'Change Password',
  [StringNames.Common_Dashboard]: 'Dashboard',
  [StringNames.Common_Site]: site,
  [StringNames.Common_Unauthorized]: 'Unauthorized',
  [StringNames.Common_UnexpectedError]: 'Unexpected Error',
  [StringNames.ForgotPassword_Title]: 'Forgot Password',
  [StringNames.Login_LoginButton]: 'Login',
  [StringNames.LogoutButton]: 'Logout',
  [StringNames.RegisterButton]: 'Register',
  [StringNames.ValidationError]: 'Validation Error',
  [StringNames.Validation_InvalidToken]: 'Invalid Token',
};

export default BritishEnglishStrings;
