import { Module } from '@nestjs/common';
import { TheaterProviders } from './theater.provider';
import { TheaterService } from './theater.service';

@Module({
  providers: [TheaterService, ...TheaterProviders],
  exports: [TheaterService, ...TheaterProviders]
})
export class TheaterModule {}
