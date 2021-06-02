import { Inject, Injectable } from '@nestjs/common';
import { Movie } from './movie.model';
import * as moment from 'moment';
import { operatorsAliases } from 'src/core/config/sequelize.config';
import { GroupTheater } from '../groupTheater/groupTheater.model';
import { Theater } from '../theater/theater.model';
import { GroupTheaterOptions } from '../groupTheater/dto/groupTheater.dto';
import { TheaterOptions } from '../theater/dto/theater.dto';
import { MovieDetail } from './dto/movie.dto';
import { User } from '../user/user.model';
const { $between } = operatorsAliases;

@Injectable()
export class MovieService {
  constructor(
    @Inject('MOVIES_REPOSITORY')
    private movieRepository: typeof Movie
  ) {}

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
      order: ['creationDate'],
      limit
    });
  }

  fetchReviewMovie(id: number) {
    return this.movieRepository.findAll({
      where: {
        id
      },
      include: [{ model: User, as: 'userReviews' }]
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

  async updateMovie(id: number, movie: MovieDetail) {
    return this.movieRepository.update(movie as Movie, {
      where: {
        id
      }
    });
  }
}
