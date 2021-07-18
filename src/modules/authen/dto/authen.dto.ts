export interface UserAuthen {
  userName: string;
  password: string;
}

export interface UserSession {
  id: number;
  user_name: string;
  password: string;
  is_admin: boolean;
  avatar: string;
}
