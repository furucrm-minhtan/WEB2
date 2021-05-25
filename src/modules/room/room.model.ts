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
import { Seat } from '../../model/seat.model';
import { ShowTime } from '../showTIme/showtime.model';
import { Theater } from '../theater/theater.model';

@Table({ tableName: 'Rooms' })
export class Room extends BaseModel<Room> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({ allowNull: false })
  name: string;

  @Max(24)
  @Column({ allowNull: false })
  rows: number;

  @Max(24)
  @Column({ allowNull: false })
  columns: number;

  @ForeignKey(() => Theater)
  @Column({ field: 'theater_id', allowNull: false })
  theaterId: number;

  @BelongsTo(() => Theater, 'theater_id')
  theater: Theater;

  @HasMany(() => Seat)
  seats: Seat[];

  @HasMany(() => ShowTime)
  showTimes: ShowTime[];
}
