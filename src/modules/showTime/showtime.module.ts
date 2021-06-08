import { Module } from '@nestjs/common';
import { ActionResponseModule } from '../actionResponse/actionresponse.module';
import { ShowTimeController } from './showtime.controller';
import { ShowTimeProvider } from './showtime.provider';
import { ShowTimeService } from './showtime.service';

@Module({
  imports: [ActionResponseModule],
  controllers: [ShowTimeController],
  providers: [ShowTimeService, ...ShowTimeProvider]
})
export class ShowTimeModule {}
