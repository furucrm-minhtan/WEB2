import { Injectable } from '@nestjs/common';
import { col, fn } from 'sequelize';
import { Movie } from '../movie/movie.model';
import { MovieService } from '../movie/movie.service';
import { User } from '../user/user.model';

@Injectable()
export class MovieListService {
  constructor(private readonly movieService: MovieService) {}

  countMovie(cateId: number): Promise<number> {
    return this.movieService.count({ where: { category_id: cateId } });
  }

  fetchMovie(
    cateId: number,
    offset: number,
    limit: number,
    sort: string
  ): Promise<Movie[]> {
    return this.movieService.findAll({
      attributes: [
        'id',
        'name',
        'poster',
        'describe',
        'run_time',
        'director',
        'MMPA_rating',
        'publish',
        'creationDate'
      ],
      include: [
        {
          attributes: [[fn('AVG', col('rate')), 'movie_rate']],
          model: User,
          as: 'userReviews',
          through: { attributes: ['rate'] },
          required: false
        }
      ],
      where: {
        category_id: cateId
      },
      group: ['id'],
      order: [sort],
      offset,
      limit,
      raw: true,
      subQuery: false
    });
  }
}
