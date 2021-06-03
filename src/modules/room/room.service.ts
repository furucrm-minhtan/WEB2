import { Inject, Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { operatorsAliases } from 'src/core/config/sequelize.config';
import { ShowTime } from '../showTime/showtime.model';
import { Room } from './room.model';
const { $between } = operatorsAliases;

@Injectable()
export class RoomService {
  constructor(
    @Inject('ROOMS_REPOSITORY') private roomRepository: typeof Room
  ) {}

  async loadRoomBooking(id: number) {
    const room: Room = await this.roomRepository.findOne({
      where: { id },
      plain: true
    });
  }

  showMovie(theaterId: number, movieId, day: number): Promise<Room[]> {
    return this.roomRepository.findAll({
      attributes: ['rows', 'columns'],
      where: {
        theaterId
      },
      include: [
        {
          attributes: ['start', 'end', 'date', 'price'],
          model: ShowTime,
          where: {
            movieId,
            date: {
              [$between]: [
                moment().toDate().toDateString(),
                moment().add(day, 'days').toDate().toDateString()
              ]
            }
          }
        }
      ],
      group: ['start', 'end', 'date']
    });
  }

  createRoom(data: Room) {
    return this.roomRepository.create(data);
  }

  updateRoom(id: number, data: Room) {
    return this.roomRepository.update(data, {
      where: {
        id
      }
    });
  }

  deleteRoom(id: number) {
    return this.roomRepository.destroy({ where: { id } });
  }
}
