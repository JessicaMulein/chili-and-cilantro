/**
 * String names for localization
 * An underscore converts to a period which causes nested object access
 * WARNING: You cannot have a key with name A and then have A_anything because it will not be able to create a nested object on a string
 * For consistency, the left side should match the right, give or take CamelCase on the left and snake case (e.g. common_blahBlah) on the right
 */
export enum StringNames {
  Common_ChangePassword = 'common_changePassword',
  Common_Dashboard = 'common_dashboard',
  Common_Site = 'common_site',
  Common_Unauthorized = 'common_unauthorized',
  Common_UnexpectedError = 'common_unexpectedError',
  ForgotPassword_Title = 'forgotPassword_title',
  Login_LoginButton = 'login_loginButton',
  LogoutButton = 'logoutButton',
  RegisterButton = 'registerButton',
  ValidationError = 'validationError',
  Validation_InvalidToken = 'validation_invalidToken',
}
