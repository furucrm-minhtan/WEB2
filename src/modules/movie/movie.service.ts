import { Inject, Injectable } from '@nestjs/common';
import { Movie } from './movie.model';

@Injectable()
export class MovieService {
  constructor(
    @Inject('MOVIES_REPOSITORY')
    private movieRepository: typeof Movie
  ) {}

  async findAll(): Promise<Movie[]> {
    return this.movieRepository.findAll<Movie>();
  }

  async newestMovie(limit: number): Promise<Movie[]> {
    return this.movieRepository.findAll({
      order: ['creationDate'],
      limit
    });
  }
}
