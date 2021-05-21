import {
  Table,
  HasMany,
  PrimaryKey,
  AutoIncrement,
  Column,
  DataType,
  Default,
  AllowNull,
  BelongsToMany
} from 'sequelize-typescript';
import { BaseModel } from '../../model/base.model';
import { Bookmark } from '../bookmark/bookmark.model';
import { Comment } from '../../model/comment.model';
import { Ticket } from '../ticket/ticket.model';
import { Movie } from '../movie/movie.model';

@Table({ tableName: 'Users' })
export class User extends BaseModel<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column
  name: string;

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

  @BelongsToMany(() => Movie, () => Comment, 'user_id')
  moviesComment: Movie[];

  @HasMany(() => Ticket)
  tickets: Ticket[];

  @BelongsToMany(() => Movie, () => Bookmark, 'user_id')
  moviesFavorite: Array<Movie & { Bookmark: Bookmark }>;
}
