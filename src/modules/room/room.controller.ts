import { Controller, Get, Param, Render } from '@nestjs/common';
import { Room } from './room.model';
import { RoomService } from './room.service';

@Controller('/room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get(':id')
  @Render('room')
  async loadRoomView(@Param('id') id: number): Promise<Room> {
    return await this.roomService.loadRoomBooking(id);
  }
}