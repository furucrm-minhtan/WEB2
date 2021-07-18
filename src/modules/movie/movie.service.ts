import { Inject, Injectable } from '@nestjs/common';
import { Movie } from './movie.model';
import moment from 'moment';
import { operatorsAliases } from 'src/core/config/sequelize.config';
import { GroupTheater } from '../groupTheater/groupTheater.model';
import { Theater } from '../theater/theater.model';
import { GroupTheaterOptions } from '../groupTheater/dto/groupTheater.dto';
import { TheaterOptions } from '../theater/dto/theater.dto';
import { MovieDetail, MovieItem } from './dto/movie.dto';
import { User } from '../user/user.model';
import { col, fn, literal, Sequelize } from 'sequelize';
import { TheaterMovieService } from '../theaterMovie/theatermovie.service';
import { ShowTime } from '../showTime/showtime.model';
import { Ticket } from '../ticket/ticket.model';
const { $between, $eq } = operatorsAliases;

@Injectable()
export class MovieService {
  constructor(
    @Inject('MOVIES_REPOSITORY')
    private movieRepository: typeof Movie,
    private theaterMovieService: TheaterMovieService,
    private squelize: Sequelize
  ) {}

  async count(options = {}) {
    return this.movieRepository.count(options);
  }

  async findAll(options = {}): Promise<Movie[]> {
    return this.movieRepository.findAll<Movie>(options);
  }

  async findMovie(id: number, options = {}) {
    return this.movieRepository.findOne({
      where: {
        id
      },
      ...options
    });
  }

  async newestMovie(limit: number): Promise<Movie[]> {
    return this.movieRepository.findAll({
      attributes: ['id', 'name', 'poster', 'creationDate'],
      include: [
        {
          attributes: [[fn('AVG', col('rate')), 'movie_rate']],
          model: User,
          as: 'userReviews',
          through: { attributes: ['rate'] },
          required: false
        }
      ],
      group: ['Movie.id', col('userReviews.id'), col('userReviews.Review.id')],
      order: ['creationDate'],
      limit,
      raw: true,
      subQuery: false
    });
  }

  topRatedMovie(limit: number): Promise<Movie[]> {
    return this.movieRepository.findAll({
      attributes: ['id', 'name', 'poster', 'creationDate'],
      include: [
        {
          attributes: [[fn('AVG', col('rate')), 'movie_rate']],
          model: User,
          as: 'userReviews',
          through: { attributes: ['rate'] },
          required: false
        }
      ],
      group: ['Movie.id', col('userReviews.Review.id')],
      order: [[fn('AVG', col('rate')), 'DESC']],
      limit,
      raw: true,
      subQuery: false
    });
  }

  mostViewed(limit: number): Promise<Movie[]> {
    return this.movieRepository.findAll({
      attributes: ['id', 'name', 'poster', 'creationDate'],
      include: [
        {
          attributes: ['id'],
          model: ShowTime,
          include: [
            {
              attributes: [[fn('SUM', col('user_id')), 'total_user']],
              model: Ticket
            }
          ],
          required: false
        }
      ],
      group: ['Movie.id', col('showTimes.id'), col('showTimes.tickets.id')],
      order: [[literal('"showTimes.tickets.total_user"'), 'DESC']],
      limit,
      raw: true,
      subQuery: false
    });
  }

  comingMovie(day: number, limit = 10): Promise<Movie[]> {
    return this.movieRepository.findAll({
      attributes: ['id', 'name', 'poster'],
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
        publish: {
          [$between]: [
            moment().toDate().toDateString(),
            moment().add(day, 'days').toDate().toDateString()
          ]
        }
      },
      group: ['Movie.id', col('userReviews.id'), col('userReviews.Review.id')],
      limit,
      subQuery: false
    });
  }

  async fetchReviewMovie(id: number): Promise<User[]> {
    const movie: Movie = await this.movieRepository.findOne({
      where: {
        id
      },
      include: [{ model: User, as: 'userReviews' }]
    });

    return movie.userReviews ?? [];
  }

  async loadBookingPage(id: number): Promise<Record<string, any>> {
    const groups: Set<GroupTheaterOptions> = new Set();
    const theaters: Record<string, Array<TheaterOptions>> = {};
    const movie: Movie = await this.findMovie(id, {
      include: [
        {
          model: Theater,
          include: [GroupTheater]
        }
      ]
    });
    const data: Record<string, any> = {
      id: movie.id,
      name: movie.name
    };

    movie.theaters.map((theater) => {
      const groupId: number = theater.groupId;

      groups.add(theater.group.get({ plain: true }));
      if (!theaters[groupId]) theaters[theater.id] = [];
      theaters[groupId].push({ id: theater.id, name: theater.name });
    });
    data.groups = JSON.stringify(Array.from(groups));
    data.theaters = JSON.stringify(theaters);

    return { ...data };
  }

  async uploadMovie(movie: MovieDetail) {
    return this.movieRepository.create(movie as Movie);
  }

  async getDetailMovie(id: number, userId: number) {
    const fetchOptions: Record<string, any> = {
      attributes: {
        exclude: ['creationDate', 'updatedOn'],
        include: [
          [fn('SUM', col('rate')), 'total_rate'],
          [fn('COUNT', col('rate')), 'total_user']
        ]
      },
      include: [
        {
          attributes: ['id', 'avatar', 'name'],
          model: User,
          as: 'userReviews',
          through: { attributes: ['rate'] }
        }
      ],
      group: ['Movie.name', 'Movie.id'],
      raw: true
    };
    userId &&
      fetchOptions.include.push({
        attributes: ['id'],
        model: User,
        as: 'userFavorites',
        where: { id: userId }
      });

    const movieDetail: MovieDetail = await this.findMovie(id, fetchOptions);
    movieDetail.isBookmark = movieDetail['userFavorites.id'] != null;
    const releatedMovie: MovieItem[] = await this.findAll({
      where: { category_id: movieDetail.category_id },
      limit: 5,
      raw: true
    });

    return { ...movieDetail, releatedMovie };
  }

  createMovie(data: Movie): Promise<Movie> {
    return this.movieRepository.create(data);
  }

  async createMovieWithTheaters(
    data: Movie,
    theaterIds: number[]
  ): Promise<void> {
    this.squelize.transaction().then((t) => {
      return this.movieRepository
        .create(data, { transaction: t })
        .then((movie) => {
          return this.theaterMovieService.createAssociationsTheater(
            movie.id,
            theaterIds,
            { transaction: t }
          );
        })
        .then(() => t.commit())
        .catch((error) => {
          t.rollback();
          throw error;
        });
    });
  }

  updateMovie(id: number, data: Movie): Promise<[number, Movie[]]> {
    return this.movieRepository.update(data, {
      where: {
        id
      }
    });
  }

  async updateMovieWithTheaters(
    data: Movie,
    theaterIds: number[]
  ): Promise<void> {
    this.squelize.transaction().then((t) => {
      return this.movieRepository
        .update(data, { where: { id: data.id }, transaction: t })
        .then(async (result: [number, Movie[]]) => {
          await this.theaterMovieService.delete({
            movieId: result[1][0].id,
            transaction: t
          });

          return this.theaterMovieService.createAssociationsTheater(
            result[1][0].id,
            theaterIds,
            { transaction: t }
          );
        })
        .then(() => t.commit())
        .catch((error) => {
          t.rollback();
          throw error;
        });
    });
  }

  deleteMovie(id: number) {
    return this.movieRepository.destroy({ where: { id } });
  }
}
