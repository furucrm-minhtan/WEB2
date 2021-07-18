import { Injectable } from '@nestjs/common';
import { literal } from 'sequelize';
import { col, fn, where } from 'sequelize';
import { operatorsAliases } from 'src/core/config/sequelize.config';
import { Movie } from '../movie/movie.model';
import { MovieService } from '../movie/movie.service';
import { ShowTime } from '../showTime/showtime.model';
import { Theater } from '../theater/theater.model';
import { User } from '../user/user.model';
const { $like, $and, $between, $gte } = operatorsAliases;

@Injectable()
export class SearchService {
  constructor(private readonly movieService: MovieService) {}

  movie({
    cateId,
    name,
    releaseDate,
    group,
    theater,
    showTimeFrom,
    paginate,
    order,
    rating
  }: SearchParams) {
    const defineQuery = {
      mainQuery: { ...paginate },
      whereAnd: [],
      subQuery: {
        theater: {},
        showTime: {}
      }
    };
    if (cateId) {
      defineQuery.whereAnd.push({ category_id: cateId });
    }

    if (order) {
      const orderArray = [];
      const orderValues = Object.values(order);
      for (let i = 0; i < orderValues.length; i += 2) {
        orderArray.push([orderValues.slice(i, i + 1)]);
      }
      defineQuery.mainQuery['order'] = orderArray;
    }

    if (name) {
      defineQuery.whereAnd.push(
        this.whereLikeLowercase('Movie.name', `${name}%`)
      );
    }

    if (showTimeFrom) {
      defineQuery.whereAnd.push(
        this.whereGreaterEqual('showTimes.start', showTimeFrom.time)
      );
      defineQuery.whereAnd.push(
        this.whereGreaterEqual('showTimes.date', showTimeFrom.date)
      );
    }

    if (group) {
      defineQuery.whereAnd.push(where(literal('"theaters.groupId"'), group));
    }

    if (releaseDate) {
      defineQuery.whereAnd.push({ release: releaseDate });
    }

    if (rating != undefined) {
      defineQuery.mainQuery['having'] = literal(
        ' `userReviews.movie_rate` >= ' + rating
      );
    }

    if (theater) {
      defineQuery.whereAnd.push({ theaters: theater });
    }

    return this.movieService.findAll({
      include: [
        {
          attributes: [[fn('AVG', col('rate')), 'movie_rate']],
          model: User,
          as: 'userReviews',
          through: { attributes: ['rate'] },
          required: false
        },
        {
          attributes: [],
          model: Theater,
          through: { attributes: [] },
          ...defineQuery.subQuery.theater
        },
        {
          attributes: [],
          model: ShowTime,
          ...defineQuery.subQuery.showTime
        }
      ],
      where: {
        [$and]: [...defineQuery.whereAnd]
      },
      ...defineQuery.mainQuery,
      group: ['Movie.id', col('userReviews.Review.id')],
      raw: true,
      subQuery: false
    });
  }

  whereLikeLowercase(field: string, value: string): any {
    return where(fn('LOWER', col(field)), {
      [$like]: value
    });
  }

  whereGreaterEqual(field: string, value): any {
    return where(col(field), {
      [$gte]: value
    });
  }
}
