/**
 * String names for localization
 * An underscore converts to a period which causes nested object access
 * WARNING: You cannot have a key with name A and then have A_anything because it will not be able to create a nested object on a string
 * For consistency, the left side should match the right, give or take CamelCase on the left and snake case (e.g. common_blahBlah) on the right
 */
export enum StringNames {
  AccountError_Message = 'accountError_message',
  AccountError_Title = 'accountError_title',
  ChangePassword_ChangePasswordButton = 'changePassword_changePasswordButton',
  ChangePassword_Success = 'changePassword_success',
  Common_ChangePassword = 'common_changePassword',
  Common_CheckingAuthentication = 'common_checkingAuthentication',
  Common_CurrentPassword = 'common_currentPassword',
  Common_DisplayName = 'common_displayName',
  Common_Email = 'common_email',
  Common_GameCode = 'common_gameCode',
  Common_GamePassword = 'common_gamePassword',
  Common_GameName = 'common_gameName',
  Common_GoToSplash = 'common_goToSplash',
  Common_Logo = 'common_logo',
  Common_NewPassword = 'common_newPassword',
  Common_ConfirmNewPassword = 'common_confirmNewPassword',
  Common_Dashboard = 'common_dashboard',
  Common_Loading = 'common_loading',
  Common_MaxChefs = 'common_maxChefs',
  Common_MasterChef = 'common_masterChef',
  Common_Optional = 'common_optional',
  Common_Password = 'common_password',
  Common_ReturnToKitchen = 'common_returnToKitchen',
  Common_Site = 'common_site',
  Common_StartCooking = 'common_startCooking',
  Common_Success = 'common_success',
  Common_Tagline = 'common_tagline',
  Common_TokenRefreshed = 'common_tokenRefreshed',
  Common_TokenValid = 'common_tokenValid',
  Common_Unauthorized = 'common_unauthorized',
  Common_UnexpectedError = 'common_unexpectedError',
  Common_Username = 'common_username',
  EmailToken_ExpiresInTemplate = 'emailToken_expiresInTemplate',
  EmailToken_TitleEmailConfirm = 'emailToken_titleEmailConfirm',
  EmailToken_TitleResetPassword = 'emailToken_titleResetPassword',
  EmailToken_ClickLinkEmailConfirm = 'emailToken_clickLinkEmailConfirm',
  EmailToken_ClickLinkResetPassword = 'emailToken_clickLinkResetPassword',
  Error_AllCardsPlaced = 'error_allCardsPlaced',
  Error_AccountStatusIsDeleted = 'error_accountStatusIsDeleted',
  Error_AccountStatusIsLocked = 'error_accountStatusIsLocked',
  Error_AccountStatusIsPendingEmailVerification = 'error_accountStatusIsPendingEmailVerification',
  Error_ChefAlreadyInGame = 'error_chefAlreadyInGame',
  Error_EmailAlreadyVerified = 'error_emailAlreadyVerified',
  Error_EmailInUse = 'error_emailInUse',
  Error_EmailTokenAlreadyUsed = 'error_emailTokenAlreadySent',
  Error_EmailTokenExpired = 'error_emailTokenExpired',
  Error_EmailTokenSentTooRecentlyTemplate = 'error_emailTokenSentTooRecentlyTemplate',
  Error_FailedToCreateEmailToken = 'error_failedToCreateEmailToken',
  Error_GameAlreadyInProgress = 'error_gameAlreadyInProgress',
  Error_GameDisplayNameAlreadyInUse = 'error_gameDisplayNameAlreadyInUse',
  Error_GameEnded = 'error_gameEnded',
  Error_GamePasswordMismatch = 'error_gamePasswordMismatch',
  Error_GameInvalidPhase = 'error_gameInvalidPhase',
  Error_InvalidAction = 'error_invalidAction',
  Error_InvalidCredentials = 'error_invalidCredentials',
  Error_MustBeMasterChef = 'error_mustBeMasterChef',
  Error_NotFound = 'error_notFound',
  Error_NotEnoughChefsTemplate = 'error_notEnoughChefs',
  Error_OutOfIngredientTemplate = 'error_outOfIngredient',
  Error_NotInGame = 'error_notInGame',
  Error_NotYourTurn = 'error_notYourTurn',
  Error_SendTokenFailure = 'error_sendTokenFailure',
  Error_TooManyChefs = 'error_tooManyChefs',
  Error_UnexpectedTurnActionTemplate = 'error_unexpectedTurnAction',
  Error_UsernameInUse = 'error_usernameInUse',
  Error_UserNotFound = 'error_userNotFound',
  Error_YouAlreadyJoined = 'error_youAlreadyJoined',
  Dashboard_GamesCreated = 'dashboard_gamesCreated',
  Dashboard_GamesParticipating = 'dashboard_gamesParticipating',
  Dashboard_NoGames = 'dashboard_noGames',
  Dashboard_Title = 'dashboard_title',
  ForgotPassword_ForgotPassword = 'forgotPassword_forgotPassword',
  ForgotPassword_InvalidToken = 'forgotPassword_invalidToken',
  ForgotPassword_ResetPassword = 'forgotPassword_resetPassword',
  ForgotPassword_SendResetToken = 'forgotPassword_sendResetToken',
  ForgotPassword_Success = 'forgotPassword_success',
  ForgotPassword_Title = 'forgotPassword_title',
  Game_CreateGame = 'game_createGame',
  Game_CreateGameSuccess = 'game_createGameSuccess',
  Game_JoinGame = 'game_joinGame',
  Game_JoinGameSuccess = 'game_joinGameSuccess',
  KeyFeatures_Title = 'keyFeatures_title',
  KeyFeatures_1 = 'keyFeatures_1',
  KeyFeatures_2 = 'keyFeatures_2',
  KeyFeatures_3 = 'keyFeatures_3',
  KeyFeatures_4 = 'keyFeatures_4',
  KeyFeatures_5 = 'keyFeatures_5',
  KeyFeatures_6 = 'keyFeatures_6',
  KeyFeatures_7 = 'keyFeatures_7',
  KeyFeatures_8 = 'keyFeatures_8',
  LanguageUpdate_Success = 'languageUpdate_success',
  LetsCook_AddChef = 'letsCook_addChef',
  LetsCook_RemoveChef = 'letsCook_removeChef',
  LetsCook_Title = 'letsCook_title',
  Login_LoginButton = 'login_loginButton',
  Login_Progress = 'login_progress',
  Login_ResendPasswordLink = 'login_resendPasswordLink',
  Login_ResentPasswordFailure = 'login_resentPasswordFailure',
  Login_ResentPasswordSuccess = 'login_resentPasswordSuccess',
  Login_NoAccountSignUp = 'login_noAccountSignUp',
  Login_Title = 'login_title',
  Login_UseEmail = 'login_useEmail',
  Login_UseUsername = 'login_useUsername',
  Login_UsernameOrEmailRequired = 'login_usernameOrEmailRequired',
  LogoutButton = 'logoutButton',
  RegisterButton = 'registerButton',
  Register_LoginLink = 'register_loginLink',
  Register_Progress = 'register_progress',
  Register_Success = 'register_success',
  Register_Title = 'register_title',
  ResetPassword_ChangeEmailFirst = 'resetPassword_changeEmailFirst',
  ResetPassword_Sent = 'resetPassword_sent',
  ResetPassword_Success = 'resetPassword_success',
  Splash_Description = 'splash_description',
  Splash_HowToPlay = 'splash_howToPlay',
  ValidationError = 'validationError',
  Validation_ConfirmNewPassword = 'validation_confirmNewPassword',
  Validation_CurrentPasswordRequired = 'validation_currentPasswordRequired',
  Validation_DisplayNameRegexErrorTemplate = 'validation_displayNameRegexErrorTemplate',
  Validation_DisplayNameRequired = 'validation_displayNameRequired',
  Validation_GameCodeRequired = 'validation_gameCodeRequired',
  Validation_GameNameRegexErrorTemplate = 'validation_gameNameRegexErrorTemplate',
  Validation_GameNameRequired = 'validation_gameNameRequired',
  Validation_GamePasswordRegexErrorTemplate = 'validation_gamePasswordRegexErrorTemplate',
  Validation_InvalidEmail = 'validation_invalidEmail',
  Validation_InvalidGame = 'validation_invalidGame',
  Validation_InvalidGameCode = 'validation_invalidGameCode',
  Validation_InvalidGameCodeTemplate = 'validation_invalidGameCodeTemplate',
  Validation_InvalidGameName = 'validation_invalidGameName',
  Validation_InvalidGameNameTemplate = 'validation_invalidGameNameTemplate',
  Validation_InvalidLanguage = 'validation_invalidLanguage',
  Validation_InvalidMaxChefsTemplate = 'validation_invalidMaxChefsTemplate',
  Validation_InvalidMaxChefsValueTemplate = 'validation_invalidMaxChefsValueTemplate',
  Validation_InvalidMessage = 'validation_invalidMessage',
  Validation_InvalidTimezone = 'validation_invalidTimezone',
  Validation_InvalidToken = 'validation_invalidToken',
  Validation_MaxChefsRequired = 'validation_maxChefsRequired',
  Validation_MessageRegexErrorTemplate = 'validation_messageRegexErrorTemplate',
  Validation_NewPasswordRequired = 'validation_newPasswordRequired',
  Validation_PasswordsDifferent = 'validation_passwordsDifferent',
  Validation_PasswordRegexErrorTemplate = 'validation_passwordRegexErrorTemplate',
  Validation_PasswordMatch = 'validation_passwordMatch',
  Validation_Required = 'validation_required',
  Validation_UsernameRegexErrorTemplate = 'validation_usernameRegexErrorTemplate',
  VerifyEmail_Success = 'verifyEmail_success',
  TEST_TESTTEMPLATE = 'testTestTemplate',
}
