import {
  Table,
  HasMany,
  PrimaryKey,
  AutoIncrement,
  Column,
  DataType,
  Default,
  AllowNull,
  BelongsToMany,
  Unique
} from 'sequelize-typescript';
import { BaseModel } from '../../model/base.model';
import { Bookmark } from '../bookmark/bookmark.model';
import { Review } from '../review/review.model';
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

  @Column({ type: DataType.STRING(100), allowNull: false, unique: true })
  email: string;

  @Column({ allowNull: false })
  password: string;

  @Column({ type: DataType.STRING(100), allowNull: false, unique: true })
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

  @Column({ type: DataType.STRING, unique: true })
  verify_code: string;

  @BelongsToMany(() => Movie, () => Review, 'user_id')
  moviesRevies: Array<Movie & { Review: Review }>;

  @HasMany(() => Ticket)
  tickets: Ticket[];

  @BelongsToMany(() => Movie, () => Bookmark, 'user_id')
  moviesFavorite: Array<Movie & { Bookmark: Bookmark }>;
}
