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
import { BaseModel } from './base.model';
import { Movie } from './movie.model';
import { Room } from './room.model';
import { Ticket } from './ticket.model';

@Table({
  tableName: 'ShowTimes',
  indexes: [
    {
      name: 'unique_showtime',
      fields: ['start', 'end']
    }
  ]
})
export class ShowTime extends BaseModel<ShowTime> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({ allowNull: false })
  start: Date;

  @Column({ allowNull: false })
  end: Date;

  @Column({ type: DataType.DECIMAL(undefined, 2), allowNull: false })
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
