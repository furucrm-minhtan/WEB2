import { Module } from '@nestjs/common';
import { ActionResponseModule } from '../actionResponse/actionresponse.module';
import { TheaterController } from './theater.controller';
import { TheaterProviders } from './theater.provider';
import { TheaterService } from './theater.service';

@Module({
  imports: [ActionResponseModule],
  controllers: [TheaterController],
  providers: [TheaterService, ...TheaterProviders],
  exports: [TheaterService, ...TheaterProviders]
})
export class TheaterModule {}
