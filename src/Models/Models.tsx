export class LoginModel {
  email: string | null = "";
  password: string | null = "";
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
  FK_roleId: any | null = "";
}

export class SubjectModel {
  name: string | null = "";
  credits: number | null = 0;
  isMandatory: boolean | undefined = false;
  deleted: boolean | null = false;
}
