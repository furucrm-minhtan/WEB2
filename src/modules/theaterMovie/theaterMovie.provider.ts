import { TheaterMovie } from './theaterMovie.model';

export const TheaterMovieProviders = [
  {
    provide: 'THEATERMOVIE_RESPOSITORY',
    useValue: TheaterMovie
  }
];
