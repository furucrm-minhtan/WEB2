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
import { Category } from '../../model/category.model';
import { Comment } from '../../model/comment.model';
import { Bookmark } from '../bookmark/bookmark.model';
import { ShowTime } from '../showTIme/showtime.model';
import { Theater } from '../theater/theater.model';
import { TheaterMovie } from '../theaterMovie/theaterMovie.model';
import { User } from '../user/user.model';

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

  @Column({ type: DataType.DATE })
  publish: Date;

  @ForeignKey(() => Category)
  @Column({ field: 'category_id', allowNull: false })
  category_id: number;

  @BelongsTo(() => Category, 'category_id')
  category: Category;

  @HasMany(() => ShowTime)
  showTimes: ShowTime[];

  @BelongsToMany(() => User, () => Comment, 'movie_id')
  userComments: User[];

  @BelongsToMany(() => User, () => Bookmark, 'movie_id')
  userFavorites: User[];

  @BelongsToMany(() => Theater, () => TheaterMovie, 'movie_id')
  theaters: Theater[];
}
