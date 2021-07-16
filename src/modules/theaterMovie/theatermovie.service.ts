import { Inject, Injectable } from '@nestjs/common';
import { TheaterMovie } from './theaterMovie.model';

@Injectable()
export class TheaterMovieService {
  constructor(
    @Inject('THEATERMOVIE_RESPOSITORY')
    private theaterMovieRepository: typeof TheaterMovie
  ) {}
}
