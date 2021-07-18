import {
  Table,
  HasMany,
  Model,
  PrimaryKey,
  AutoIncrement,
  Column,
  DataType,
  Default,
  Max,
  BelongsTo,
  ForeignKey
} from 'sequelize-typescript';
import { BaseModel } from '../../model/base.model';
import { Seat } from '../seat/seat.model';
import { ShowTime } from '../showTime/showtime.model';
import { Theater } from '../theater/theater.model';

@Table({ tableName: 'Rooms' })
export class Room extends BaseModel<Room> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({ allowNull: false })
  name: string;

  @Max(7)
  @Column({ allowNull: false })
  rows: number;

  @Max(9)
  @Column({ allowNull: false })
  columns: number;

  @ForeignKey(() => Theater)
  @Column({ field: 'theater_id', allowNull: false })
  theaterId: number;

  @BelongsTo(() => Theater, 'theater_id')
  theater: Theater;

  @HasMany(() => Seat, {
    onDelete: 'CASCADE',
    hooks: true
  })
  seats: Seat[];

  @HasMany(() => ShowTime, {
    onDelete: 'CASCADE',
    hooks: true
  })
  showTimes: ShowTime[];
}
