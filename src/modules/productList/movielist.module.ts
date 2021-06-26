import { Module } from '@nestjs/common';
import { ActionResponseModule } from '../actionResponse/actionresponse.module';
import { MovieModule } from '../movie/movie.module';
import { MovieListController } from './movieList.controller';
import { MovieListService } from './movietlist.service';

@Module({
  imports: [ActionResponseModule, MovieModule],
  controllers: [MovieListController],
  providers: [MovieListService]
})
export class MovieListModule {}
