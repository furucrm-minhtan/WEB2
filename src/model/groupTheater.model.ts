import {
  AutoIncrement,
  Column,
  PrimaryKey,
  Table,
  HasMany
} from 'sequelize-typescript';
import { BaseModel } from './base.model';
import { Theater } from './theater.model';

@Table({ tableName: 'GroupTheater' })
export class GroupTheater extends BaseModel<GroupTheater> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({ allowNull: false, unique: true })
  name: string;

  @Column({ allowNull: false, unique: true })
  address: string;

  @HasMany(() => Theater)
  theaters: Theater[];
}
