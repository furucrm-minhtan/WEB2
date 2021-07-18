import {
  Table,
  HasMany,
  Model,
  PrimaryKey,
  AutoIncrement,
  Column,
  DataType,
  Default,
  BelongsTo,
  ForeignKey,
  BelongsToMany
} from 'sequelize-typescript';
import { BaseModel } from '../../model/base.model';
import { Category } from '../category/category.model';
import { Review } from '../review/review.model';
import { Bookmark } from '../bookmark/bookmark.model';
import { ShowTime } from '../showTime/showtime.model';
import { Theater } from '../theater/theater.model';
import { TheaterMovie } from '../theaterMovie/theaterMovie.model';
import { User } from '../user/user.model';
import { MMPARating } from './dto/movie.dto';

@Table({ tableName: 'Movies' })
export class Movie extends BaseModel<Movie> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({ allowNull: false })
  name: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  poster: string;

  @Column({ type: DataType.TEXT })
  trailer: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  describe: string;

  @Column({ allowNull: false })
  director: string;

  @Column({ allowNull: false })
  writer: string;

  @Column({ type: DataType.DATE, allowNull: false })
  publish: Date;

  @Column({ allowNull: false })
  MMPA_rating: MMPARating;

  @Column({ allowNull: false })
  run_time: number;

  @ForeignKey(() => Category)
  @Column({ field: 'category_id', allowNull: false })
  category_id: number;

  @BelongsTo(() => Category, 'category_id')
  category: Category;

  @HasMany(() => ShowTime)
  showTimes: ShowTime[];

  @BelongsToMany(() => User, () => Review, 'movie_id')
  userReviews: User[];

  @BelongsToMany(() => User, () => Bookmark, 'movie_id')
  userFavorites: User[];

  @BelongsToMany(() => Theater, () => TheaterMovie, 'movie_id')
  theaters: Theater[];
}
