import { IsNotEmpty } from 'class-validator';

export interface UserProfile {
  id: number;
  user_name: string;
  phone: string;
  address: string;
  city: string;
}

export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
}

export interface UserRegister {
  user_name: string;
  email: string;
  password: string;
  name: string;
}

export class ResetPassword {
  @IsNotEmpty()
  password: string;
}
