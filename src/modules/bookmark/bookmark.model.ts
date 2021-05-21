import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  PrimaryKey,
  Table
} from 'sequelize-typescript';
import { BaseModel } from '../../model/base.model';
import { Movie } from '../movie/movie.model';
import { User } from '../user/user.model';

@Table({ tableName: 'Bookmarks' })
export class Bookmark extends BaseModel<Bookmark> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => User)
  @Column({ field: 'user_id', allowNull: false })
  userId: number;

  @ForeignKey(() => Movie)
  @Column({ field: 'movie_id', allowNull: false })
  movieId: number;
}
