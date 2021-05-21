import {
  AutoIncrement,
  Column,
  PrimaryKey,
  Table,
  DataType,
  BelongsTo,
  HasMany,
  Default,
  ForeignKey
} from 'sequelize-typescript';
import { BaseModel } from './base.model';
import { GroupTheater } from './groupTheater.model';
import { Room } from '../modules/room/room.model';

type TheaterType = '2D' | '3D';

@Table({ tableName: 'Theaters' })
export class Theater extends BaseModel<Theater> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({ allowNull: false })
  name: string;

  @Default('2D')
  @Column
  type: TheaterType;

  @HasMany(() => Room)
  rooms: Room[];

  @ForeignKey(() => GroupTheater)
  @Column({ field: 'group_id', allowNull: false })
  groupId: number;

  @BelongsTo(() => GroupTheater, 'group_id')
  group: GroupTheater;
}
