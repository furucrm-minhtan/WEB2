import {
  Table,
  HasMany,
  Model,
  PrimaryKey,
  AutoIncrement,
  Column,
  DataType,
  Default
} from 'sequelize-typescript';
import { BaseModel } from '../../model/base.model';
import { Bookmarks } from '../../model/bookmark.model';
import { Comment } from '../../model/comment.model';
import { Ticket } from '../../model/ticket.model';

@Table({ tableName: 'Users' })
export class User extends BaseModel<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({ type: DataType.STRING(100), allowNull: false })
  email: string;

  @Column({ allowNull: false })
  password: string;

  @Column({ type: DataType.STRING(100), allowNull: false })
  user_name: string;

  @Column(DataType.STRING(20))
  phone: string;

  @Column
  address: string;

  @Default(false)
  @Column
  is_admin: boolean;

  @Column(DataType.STRING(100))
  city: string;

  @HasMany(() => Comment)
  comments: Comment[];

  @HasMany(() => Ticket)
  tickets: Ticket[];

  @HasMany(() => Bookmarks)
  bookmarks: Bookmarks;
}
