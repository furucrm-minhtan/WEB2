import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  PrimaryKey,
  Table
} from 'sequelize-typescript';
import { BaseModel } from 'src/model/base.model';
import { Movie } from '../movie/movie.model';
import { Theater } from '../theater/theater.model';

@Table({ tableName: 'Theater_Movie' })
export class TheaterMovie extends BaseModel<TheaterMovie> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Theater)
  @Column({ field: 'theater_id', allowNull: false })
  theaterId: number;

  @ForeignKey(() => Movie)
  @Column({ field: 'movie_id', allowNull: false })
  movieId: number;

  @BelongsTo(() => Theater, 'theater_id')
  theater: Theater;

  @BelongsTo(() => Movie, 'movie_id')
  movie: Movie;
}
