import { Seat } from './seat.model';

export const SeatProviders = [
  {
    provide: 'SEATS_REPOSITORY',
    useValue: Seat
  }
];
