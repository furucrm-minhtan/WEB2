import { Module } from '@nestjs/common';
import { SeatProviders } from './seat.provider';
import { SeatService } from './seat.service';

@Module({
  providers: [SeatService, ...SeatProviders],
  exports: [SeatService]
})
export class SeatModule {}
