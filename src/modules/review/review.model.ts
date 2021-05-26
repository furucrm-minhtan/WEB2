import {
  AutoIncrement,
  Column,
  PrimaryKey,
  Table,
  DataType,
  BelongsTo,
  ForeignKey
} from 'sequelize-typescript';
import { BaseModel } from '../../model/base.model';
import { Movie } from '../movie/movie.model';
import { User } from '../user/user.model';

@Table({ tableName: 'Reviews' })
export class Review extends BaseModel<Review> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  context: string;

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
