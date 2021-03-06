import { MovieController } from './movie.controller';
import { Module } from '@nestjs/common';
import { HomeController } from '../home/home.controller';
import { MovieProviders } from './movie.provider';
import { MovieService } from './movie.service';
import { GroupThearterModule } from '../groupTheater/groupthearter.module';
import { TheaterModule } from '../theater/theater.module';
import { ActionResponseModule } from '../actionResponse/actionresponse.module';
import { TheaterMovieModule } from '../theaterMovie/theatermovie.module';

@Module({
  imports: [
    GroupThearterModule,
    TheaterModule,
    TheaterMovieModule,
    ActionResponseModule
  ],
  controllers: [MovieController],
  providers: [MovieService, ...MovieProviders],
  exports: [MovieService, ...MovieProviders]
})
export class MovieModule {}
