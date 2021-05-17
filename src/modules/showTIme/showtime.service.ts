import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize';
import { Ticket } from 'src/model/ticket.model';
import { Movie } from '../movie/movie.model';
import { ShowTime } from './showTime.model';

@Injectable()
export class ShowTimeService {
  constructor(
    @Inject('SHOWTIMES_REPOSITORY') private showTimeRepository: typeof ShowTime
  ) {}

  async topMovie(): Promise<ShowTime[]> {
    return this.showTimeRepository.findAll({
      attributes: {
        include: [
          [
            Sequelize.fn('COUNT', Sequelize.col(`{${Ticket.tableName}.id}`)),
            'totalTicket'
          ]
        ]
      },
      include: [Ticket, Movie],
      group: [`${Movie.tableName}.name`]
    });
  }
}
