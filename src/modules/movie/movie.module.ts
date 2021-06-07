import { MovieController } from './movie.controller';
import { Module } from '@nestjs/common';
import { HomeController } from '../home/home.controller';
import { MovieProviders } from './movie.provider';
import { MovieService } from './movie.service';
import { GroupThearterModule } from '../groupTheater/groupthearter.module';
import { TheaterModule } from '../theater/theater.module';
import { ActionResponseModule } from '../actionResponse/actionresponse.module';

@Module({
  imports: [GroupThearterModule, TheaterModule, ActionResponseModule],
  controllers: [MovieController],
  providers: [MovieService, ...MovieProviders],
  exports: [MovieService, ...MovieProviders]
})
export class MovieModule {}
