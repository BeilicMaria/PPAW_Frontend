export class LoginModel {
  email: string | null = "";
  password: string | null = "";
  reCaptcha: string | null = "";
}

export class WizardModel {
  isUserAccount = "true";
  userName = "";
  email = "";
  fullName = "";
  phone = "";
  ValidationCode = "";
  image = "";
  FK_userAccountId = "";
  FK_subscriptionId = "";
  country = "";
  county = "";
  city = "";
  address = "";

  name = "";
  FK_categoryId = "";
  CUI = "";
  registerNo = "";
  representativeName = "";
  userNames: Array<string> = [];
  emails: Array<string> = [];
}

export class UserModel {
  userName: string | null = "";
  password: string | null = "";
  password_confirmation: string | null = "";
  lastName: string | null = "";
  firstName: string | null = "";
  email: string | null = "";
  phone: string | null = "";
  dateOfBirth: Date | null = null;
  role: string | null = "";
  status: boolean | null = true;
}
