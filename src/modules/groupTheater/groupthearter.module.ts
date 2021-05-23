import { Module } from '@nestjs/common';
import { GroupTheaterProviders } from './groupTheater.provider';
import { GroupTheaterService } from './grouptheater.service';

@Module({
  providers: [GroupTheaterService, ...GroupTheaterProviders],
  exports: [GroupTheaterService]
})
export class GroupThearterModule {}
