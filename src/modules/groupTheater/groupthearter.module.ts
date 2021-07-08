import { Module } from '@nestjs/common';
import { ActionResponseModule } from '../actionResponse/actionresponse.module';
import { GroupTheaterProviders } from './groupTheater.provider';
import { GroupTheaterService } from './grouptheater.service';
import { GroupthearterController } from './groupthearter.controller';

@Module({
  imports: [ActionResponseModule],
  providers: [GroupTheaterService, ...GroupTheaterProviders],
  exports: [GroupTheaterService, ...GroupTheaterProviders],
  controllers: [GroupthearterController]
})
export class GroupThearterModule {}
