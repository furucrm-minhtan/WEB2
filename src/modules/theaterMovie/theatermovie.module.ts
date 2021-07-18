import { Module } from '@nestjs/common';
import { TheaterMovieProviders } from './theaterMovie.provider';
import { TheaterMovieService } from './theatermovie.service';

@Module({
  providers: [TheaterMovieService, ...TheaterMovieProviders],
  exports: [TheaterMovieService]
})
export class TheaterMovieModule {}
