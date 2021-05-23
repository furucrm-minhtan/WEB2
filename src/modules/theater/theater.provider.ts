import { Theater } from './theater.model';

export const TheaterProviders = [
  {
    provide: 'THEATERS_REPOSITORY',
    useValue: Theater
  }
];
