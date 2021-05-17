import { ShowTime } from './showTime.model';

export const MovieProviders = [
  {
    provide: 'SHOWTIMES_REPOSITORY',
    useValue: ShowTime
  }
];