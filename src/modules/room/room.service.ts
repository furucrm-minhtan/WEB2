import { Inject, Injectable } from '@nestjs/common';
import { Room } from './room.model';

@Injectable()
export class RoomService {
  constructor(
    @Inject('ROOMS_REPOSITORY') private roomRepository: typeof Room
  ) {}

  async loadRoomBooking(id: number): Promise<Room> {
    return await this.roomRepository.findOne({ where: { id } });
  }
}
