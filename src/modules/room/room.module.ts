import { Module } from '@nestjs/common';
import { ActionResponseModule } from '../actionResponse/actionresponse.module';
import { RoomController } from './room.controller';
import { RoomProviders } from './room.provider';
import { RoomService } from './room.service';

@Module({
  imports: [ActionResponseModule],
  controllers: [RoomController],
  providers: [RoomService, ...RoomProviders]
})
export class RoomModule {}
