import { Injectable } from '@nestjs/common';
import { col, fn, where } from 'sequelize';
import { operatorsAliases } from 'src/core/config/sequelize.config';
import { Movie } from '../movie/movie.model';
import { MovieService } from '../movie/movie.service';
import { User } from '../user/user.model';
const { $like, $and } = operatorsAliases;

@Injectable()
export class SearchService {
  constructor(private readonly movieService: MovieService) {}

  movie(name) {
    return this.movieService.findAll({
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
        [$and]: [
          where(fn('LOWER', col(`Movie.name`)), {
            [$like]: `${name}%`
          })
        ]
      },
      group: ['id'],
      raw: true,
      subQuery: false
    });
  }
}
