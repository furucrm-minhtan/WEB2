import { Controller, Get, Param, Query, Render } from '@nestjs/common';
import { ActionResponseService } from '../actionResponse/actionresponse.service';
import { Room } from './room.model';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
  constructor(
    private readonly roomService: RoomService,
    private readonly actionResponse: ActionResponseService
  ) {}

  @Get(':id')
  async loadRoomView(@Param('id') id: number, @Query('movie') movieId: number) {
    try {
      const rooms: Room[] = await this.roomService.showMovie(id, movieId, 5);

      return this.actionResponse.responseApi(true, rooms, '');
    } catch (error) {
      console.log(error);
    }

    return this.actionResponse.responseApi(false, '', 'fetch data failed');
  }
}
