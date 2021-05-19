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
export class Bookmarks extends BaseModel<Bookmarks> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => User)
  @Column({ field: 'user_id', allowNull: false })
  userId: number;

  @BelongsTo(() => User, 'user_id')
  user: User;

  @ForeignKey(() => Movie)
  @Column({ field: 'movie_id', allowNull: false })
  movieId: number;

  @BelongsTo(() => Movie, 'movie_id')
  movie: Movie;
}
