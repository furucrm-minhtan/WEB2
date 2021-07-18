import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Render
} from '@nestjs/common';
import { ActionResponseService } from '../actionResponse/actionresponse.service';
import { Theater } from '../theater/theater.model';
import { CreateRoom, UpdateRoom } from './dto/room.dto';
import { Room } from './room.model';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
  constructor(
    private readonly roomService: RoomService,
    private readonly actionResponseService: ActionResponseService
  ) {}

  @Get(':id')
  async loadRoomView(@Param('id') id: number, @Query('movie') movieId: number) {
    try {
      const roomsDisplay: Record<string, Room[]> = {};
      // const rooms: Room[] = await this.roomService.showMovie(id, movieId, 5);

      // rooms.forEach((room) => {
      //   if (roomsDisplay[room.]) roomsDisplay[room.id] = [];
      //   roomsDisplay[room.id].push(room);
      // })

      return this.actionResponseService.responseApi(true, roomsDisplay, '');
    } catch (error) {
      console.log(error);
    }

    return this.actionResponseService.responseApi(
      false,
      '',
      'fetch data failed'
    );
  }

  @Get()
  async fetchRoom() {
    try {
      const rooms: Room[] = await this.roomService.findAll({
        include: Theater
      });

      return this.actionResponseService.responseApi(true, rooms, '');
    } catch (error) {
      console.log(error);
    }
    return this.actionResponseService.responseApi(false, [], '');
  }

  @Post()
  async create(@Body() data: CreateRoom) {
    try {
      const room: Room = await this.roomService.create(data as Room);

      return this.actionResponseService.responseApi(true, room, '');
    } catch (error) {
      console.log(error);
    }
    return this.actionResponseService.responseApi(false, '', 'create failed');
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateRoom
  ) {
    try {
      await this.roomService.update(id, data as Room);

      return this.actionResponseService.responseApi(true, '', '');
    } catch (error) {
      console.log(error);
    }
    return this.actionResponseService.responseApi(false, [], '');
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      const deleted: number = await this.roomService.deleteWithId(id);

      return this.actionResponseService.responseApi(true, deleted, '');
    } catch (error) {
      console.log(error);
    }
    return this.actionResponseService.responseApi(false, [], '');
  }
}
