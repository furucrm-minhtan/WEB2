import { GroupTheater } from './groupTheater.model';

export const GroupTheaterProviders = [
  {
    provide: 'GROUPTHEATERS_REPOSITORY',
    useValue: GroupTheater
  }
];
