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
