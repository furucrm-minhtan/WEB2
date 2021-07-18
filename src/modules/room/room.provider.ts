import { Room } from './room.model';

export const RoomProviders = [
  {
    provide: 'ROOMS_REPOSITORY',
    useValue: Room
  }
];
