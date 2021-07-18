import { User } from './user.model';

export const UserProviders = [
  {
    provide: 'USERS_REPOSITORY',
    useValue: User
  }
];
