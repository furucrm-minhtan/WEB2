import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { col, fn, literal, where } from 'sequelize';
import { MovieService } from '../movie/movie.service';
import { GroupTheaterService } from '../groupTheater/grouptheater.service';
import { ShowTime } from '../showTime/showtime.model';
import { Ticket } from '../ticket/ticket.model';
import { operatorsAliases } from 'src/core/config/sequelize.config';
import { Theater } from '../theater/theater.model';
import { Room } from '../room/room.model';
const { $like, $between, $and } = operatorsAliases;

@Injectable()
export class StatisticalService {
  constructor(
    private readonly userService: UserService,
    private readonly movieService: MovieService,
    private readonly groupTheaterService: GroupTheaterService
  ) {}

  userQuantity(year: string) {
    return this.userService.findAll({
      attributes: [
        [fn('MONTH', col('creationDate')), 'Month'],
        [fn('COUNT', col('id')), 'Quantity']
      ],
      where: where(fn('YEAR', col('creationDate')), year),
      group: [col('Month')]
    });
  }

  annualMovie(limit: number, start: string, end: string) {
    return this.movieService.findAll({
      attributes: ['id', 'name'],
      include: [
        {
          attributes: ['id', 'date'],
          model: ShowTime,
          include: [
            {
              attributes: [[fn('SUM', col('price')), 'total_price']],
              model: Ticket
            }
          ],
          required: false
        }
      ],
      limit,
      group: ['Movie.id'],
      having: where(col('showTimes.date'), { [$between]: [start, end] }),
      order: [[literal('`showTimes.tickets.total_price`'), 'DESC']],
      raw: true,
      subQuery: false
    });
  }

  annualGroup(limit: number, start: string, end: string) {
    return this.movieService.findAll({
      attributes: ['id', 'name'],
      include: [
        {
          attributes: ['id'],
          model: Theater,
          include: [
            {
              model: Room,
              include: [
                {
                  attributes: ['date'],
                  model: ShowTime,
                  include: [
                    {
                      attributes: [[fn('SUM', col('price')), 'total_price']],
                      model: Ticket
                    }
                  ]
                }
              ]
            }
          ],
          required: false
        }
      ],
      limit,
      group: ['Movie.id'],
      having: where(col('theaters.rooms.showTimes.date'), {
        [$between]: [start, end]
      }),
      order: [
        [literal('`theaters.rooms.showTimes.tickets.total_price`'), 'DESC']
      ],
      raw: true,
      subQuery: false
    });
  }
}
