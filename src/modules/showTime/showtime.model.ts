import {
  AutoIncrement,
  Column,
  PrimaryKey,
  Table,
  DataType,
  BelongsTo,
  HasMany,
  ForeignKey
} from 'sequelize-typescript';
import { BaseModel } from '../../model/base.model';
import { Movie } from '../movie/movie.model';
import { Room } from '../room/room.model';
import { Ticket } from '../ticket/ticket.model';

@Table({
  tableName: 'ShowTimes',
  indexes: [
    {
      name: 'unique_showtime',
      fields: ['start', 'end', 'date']
    }
  ]
})
export class ShowTime extends BaseModel<ShowTime> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({ type: DataType.TIME, allowNull: false })
  start: Date;

  @Column({ type: DataType.TIME, allowNull: false })
  end: Date;

  @Column({ type: DataType.DATEONLY, allowNull: false })
  date: Date;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  price: number;

  @ForeignKey(() => Room)
  @Column({ field: 'room_id', allowNull: false })
  roomId: number;

  @BelongsTo(() => Room)
  room: Room;

  @ForeignKey(() => Movie)
  @Column({ field: 'movie_id', allowNull: false })
  movieId: number;

  @BelongsTo(() => Movie, 'movie_id')
  movie: Movie;

  @HasMany(() => Ticket)
  tickets: Ticket[];
}
