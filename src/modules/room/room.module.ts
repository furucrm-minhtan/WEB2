import { Module } from '@nestjs/common';
import { ActionResponseModule } from '../actionResponse/actionresponse.module';
import { SeatModule } from '../seat/seat.module';
import { RoomController } from './room.controller';
import { RoomProviders } from './room.provider';
import { RoomService } from './room.service';

@Module({
  imports: [SeatModule, ActionResponseModule],
  controllers: [RoomController],
  providers: [RoomService, ...RoomProviders]
})
export class RoomModule {}
