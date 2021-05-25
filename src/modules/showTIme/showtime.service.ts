import { Inject, Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { Sequelize } from 'sequelize';
import { operatorsAliases } from 'src/core/config/sequelize.config';
import Helper from 'src/helper/helper';
import { Seat } from 'src/model/seat.model';
import { Ticket } from 'src/modules/ticket/ticket.model';
import { Movie } from '../movie/movie.model';
import { Room } from '../room/room.model';
import { ShowTime } from './showtime.model';
const { $between } = operatorsAliases;

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

  async fetchShowTimeMovie(
    theaterId: number,
    movieId: number,
    day: number
  ): Promise<Record<string, Room[]>> {
    const showTimesDisplay: Record<string, ShowTime[]> = {};
    const showTimes: ShowTime[] = await this.showTimeRepository.findAll({
      attributes: ['start', 'end', 'date', 'price'],
      where: {
        movieId,
        date: {
          [$between]: [
            moment().toDate().toDateString(),
            moment().add(day, 'days').toDate().toDateString()
          ]
        }
      },
      include: [
        {
          attributes: ['rows', 'columns', 'name'],
          model: Room,
          where: {
            theaterId
          },
          include: [Seat]
        }
      ],
      group: ['start', 'end', 'date']
    });

    showTimes.forEach((show) => {
      const date: string = (show.date as unknown) as string;
      if (!showTimesDisplay[date]) showTimesDisplay[date] = [];
      showTimesDisplay[date].push(show);
    });

    return Helper.sortLiteralObject(showTimesDisplay);
  }
}
