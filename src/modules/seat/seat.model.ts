import {
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  Column,
  Default,
  BelongsTo,
  ForeignKey,
  DataType,
  HasMany
} from 'sequelize-typescript';
import { BaseModel } from '../../model/base.model';
import { Room } from '../room/room.model';
import { Ticket } from '../ticket/ticket.model';

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

  @Column({ type: DataType.ENUM('A', 'B', 'C', 'D', 'E', 'F', 'G') })
  row: string;

  @Column
  column: number;

  @Column(DataType.VIRTUAL)
  get position(): string {
    return `${this.getDataValue('row')}-${this.getDataValue('column')}`;
  }

  @ForeignKey(() => Room)
  @Column({ field: 'room_id', allowNull: false })
  roomId: number;

  @BelongsTo(() => Room, 'room_id')
  room: Room;

  @HasMany(() => Ticket)
  tickets: Ticket[];
}
