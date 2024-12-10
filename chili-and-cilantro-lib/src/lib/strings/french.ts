import { StringNames } from '../enumerations/string-names';
import { StringsCollection } from '../shared-types';

const site = 'Piment et Coriandre';

export const FrenchStrings: StringsCollection = {
  [StringNames.Common_ChangePassword]: 'Changer le mot de passe',
  [StringNames.Common_Dashboard]: 'Tableau de bord',
  [StringNames.Common_Site]: site,
  [StringNames.Common_Unauthorized]: 'Non autorisé',
  [StringNames.Common_UnexpectedError]: 'Erreur inattendue',
  [StringNames.ForgotPassword_Title]: 'Mot de passe oublié',
  [StringNames.Login_LoginButton]: 'Connexion',
  [StringNames.LogoutButton]: 'Déconnexion',
  [StringNames.RegisterButton]: "S'inscrire",
  [StringNames.ValidationError]: 'Erreur de validation',
  [StringNames.Validation_InvalidToken]: 'Jeton invalide',
};

export default FrenchStrings;
