import {
  AutoIncrement,
  Column,
  PrimaryKey,
  Table,
  BelongsTo,
  ForeignKey
} from 'sequelize-typescript';
import { BaseModel } from '../../model/base.model';
import { Seat } from '../seat/seat.model';
import { ShowTime } from '../showTime/showtime.model';
import { User } from '../user/user.model';

@Table({ tableName: 'Tickets' })
export class Ticket extends BaseModel<Ticket> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => User)
  @Column({ field: 'user_id' })
  userId: number;

  @BelongsTo(() => User, 'user_id')
  user: User;

  @ForeignKey(() => ShowTime)
  @Column({ field: 'show_id' })
  showId: number;

  @BelongsTo(() => ShowTime, 'show_id')
  show: ShowTime;

  @ForeignKey(() => Seat)
  @Column({ field: 'seat_id' })
  seatId: number;

  @BelongsTo(() => Seat, 'seat_id')
  seat: Seat;
}
