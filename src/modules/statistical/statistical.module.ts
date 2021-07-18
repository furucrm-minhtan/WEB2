import { Module } from '@nestjs/common';
import { ActionResponseModule } from '../actionResponse/actionresponse.module';
import { GroupThearterModule } from '../groupTheater/groupthearter.module';
import { MovieModule } from '../movie/movie.module';
import { UserModule } from '../user/user.module';
import { StatisticalController } from './statistical.controller';
import { StatisticalService } from './statistical.service';

@Module({
  imports: [MovieModule, GroupThearterModule, UserModule, ActionResponseModule],
  controllers: [StatisticalController],
  providers: [StatisticalService]
})
export class StatisticalModule {}
