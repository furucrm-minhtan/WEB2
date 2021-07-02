import { Module } from '@nestjs/common';
import { ActionResponseModule } from '../actionResponse/actionresponse.module';
import { GroupThearterModule } from '../groupTheater/groupthearter.module';
import { MovieModule } from '../movie/movie.module';
import { TheaterModule } from '../theater/theater.module';
import { MovieListController } from './movieList.controller';
import { MovieListService } from './movietlist.service';

@Module({
  imports: [
    ActionResponseModule,
    MovieModule,
    GroupThearterModule,
    TheaterModule
  ],
  controllers: [MovieListController],
  providers: [MovieListService]
})
export class MovieListModule {}
