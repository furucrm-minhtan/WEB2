import { Inject, Injectable } from '@nestjs/common';
import moment from 'moment';
import { operatorsAliases } from 'src/core/config/sequelize.config';
import { ShowTime } from '../showTime/showtime.model';
import { Room } from './room.model';
import { Sequelize } from 'sequelize';
import { SeatService } from '../seat/seat.service';
import { Theater } from '../theater/theater.model';
const { $between } = operatorsAliases;

@Injectable()
export class RoomService {
  constructor(
    @Inject('ROOMS_REPOSITORY') private roomRepository: typeof Room,
    private seatService: SeatService,
    private sequelize: Sequelize
  ) {}

  async loadRoomBooking(id: number): Promise<Room> {
    return this.roomRepository.findOne({
      where: { id },
      plain: true
    });
  }

  findAll(options: Record<string, any>) {
    return this.roomRepository.findAll(options);
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

  async create(data: Room): Promise<Room> {
    return this.sequelize.transaction().then(async (t) => {
      try {
        const room: Room = await this.roomRepository.create(data, {
          transaction: t
        });
        await this.seatService.createSeatsForRoom(
          {
            id: room.id,
            row: room.rows,
            col: room.columns
          },
          { transaction: t }
        );

        t.commit();
        return room.reload({ include: Theater });
      } catch (error) {
        t.rollback();
        throw error;
      }
    });
  }

  update(id: number, data: Room): void {
    this.sequelize.transaction().then((t) => {
      return this.roomRepository
        .update(data, {
          where: {
            id
          },
          transaction: t
        })
        .then(async (room) => {
          await this.seatService.delete({
            roomId: room[1][0].id,
            transaction: t
          });

          return this.seatService.createSeatsForRoom({
            id: data.id,
            row: data.rows,
            col: data.columns
          });
        })
        .then(() => t.commit())
        .catch((error) => {
          t.rollback();
          throw error;
        });
    });
  }

  deleteWithId(id: number): Promise<number> {
    return this.roomRepository.destroy({ where: { id } });
  }
}
