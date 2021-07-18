import { ShowTime } from './showtime.model';

export const ShowTimeProvider = [
  {
    provide: 'SHOWTIMES_REPOSITORY',
    useValue: ShowTime
  }
];
