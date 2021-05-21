import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomProviders } from './room.provider';
import { RoomService } from './room.service';

@Module({
  controllers: [RoomController],
  providers: [RoomService, ...RoomProviders]
})
export class RoomModule {}
