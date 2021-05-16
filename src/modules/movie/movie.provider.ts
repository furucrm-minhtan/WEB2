import { Movie } from './movie.model';

export const MovieProviders = [
  {
    provide: 'MOVIES_REPOSITORY',
    useValue: Movie
  }
];
