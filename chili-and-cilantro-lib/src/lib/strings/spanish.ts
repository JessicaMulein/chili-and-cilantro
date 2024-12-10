import { StringNames } from '../enumerations/string-names';
import { StringsCollection } from '../shared-types';

const site = 'Chili y Cilantro';

export const SpanishStrings: StringsCollection = {
  [StringNames.Common_ChangePassword]: 'Cambiar contraseña',
  [StringNames.Common_Dashboard]: 'Tablero',
  [StringNames.Common_Site]: site,
  [StringNames.Common_Unauthorized]: 'No autorizado',
  [StringNames.Common_UnexpectedError]: 'Error inesperado',
  [StringNames.ForgotPassword_Title]: 'Contraseña olvidada',
  [StringNames.Login_LoginButton]: 'Iniciar sesión',
  [StringNames.LogoutButton]: 'Cerrar sesión',
  [StringNames.RegisterButton]: 'Registrarse',
  [StringNames.ValidationError]: 'Error de validación',
  [StringNames.Validation_InvalidToken]: 'Token inválido',
};

export default SpanishStrings;
