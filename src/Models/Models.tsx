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
