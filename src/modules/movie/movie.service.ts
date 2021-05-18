import { Inject, Injectable } from '@nestjs/common';
import { Movie } from './movie.model';
import * as moment from 'moment';
import { operatorsAliases } from 'src/core/config/sequelize.config';
const { $between } = operatorsAliases;

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

  comingMovie(day: number, limit = 10): Promise<Movie[]> {
    return this.movieRepository.findAll({
      where: {
        publish: {
          [$between]: [
            moment().toDate().toDateString(),
            moment().add(day, 'days').toDate().toDateString()
          ]
        }
      },
      limit
    });
  }
}
