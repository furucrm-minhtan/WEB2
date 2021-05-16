import {
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  Column,
  Default,
  BelongsTo,
  ForeignKey
} from 'sequelize-typescript';
import { BaseModel } from './base.model';
import { Room } from './room.model';

@Table({
  tableName: 'Seats',
  indexes: [
    {
      name: 'unique_seat',
      fields: ['row', 'column']
    }
  ]
})
export class Seat extends BaseModel<Seat> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Default(false)
  @Column
  row: number;

  @Default(false)
  @Column
  column: string;

  @ForeignKey(() => Room)
  @Column({ field: 'room_id', allowNull: false })
  roomId: number;

  @BelongsTo(() => Room, 'room_id')
  room: Room;
}
