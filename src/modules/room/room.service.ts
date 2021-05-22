import { Inject, Injectable } from '@nestjs/common';
import { Room } from './room.model';

@Injectable()
export class RoomService {
  constructor(
    @Inject('ROOMS_REPOSITORY') private roomRepository: typeof Room
  ) {}

  async loadRoomBooking(id: number): Promise<Array<Array<number>>> {
    const room: Room = await this.roomRepository.findOne({
      where: { id },
      plain: true
    });
    console.log(room);
    return Array.from(Array(room.rows).keys(), () => [
      ...Array(room.columns).keys()
    ]);
  }
}
