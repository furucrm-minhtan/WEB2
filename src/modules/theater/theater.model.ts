import {
  AutoIncrement,
  Column,
  PrimaryKey,
  Table,
  DataType,
  BelongsTo,
  HasMany,
  Default,
  ForeignKey,
  BelongsToMany
} from 'sequelize-typescript';
import { BaseModel } from '../../model/base.model';
import { GroupTheater } from '../groupTheater/groupTheater.model';
import { Movie } from '../movie/movie.model';
import { Room } from '../room/room.model';
import { TheaterMovie } from '../theaterMovie/theaterMovie.model';

type TheaterType = '2D' | '3D';

@Table({ tableName: 'Theaters' })
export class Theater extends BaseModel<Theater> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({ allowNull: false })
  name: string;

  @Default('2D')
  @Column({ type: DataType.ENUM('2D', '3D') })
  type: TheaterType;

  @HasMany(() => Room, {
    onDelete: 'CASCADE',
    hooks: true
  })
  rooms: Room[];

  @ForeignKey(() => GroupTheater)
  @Column({ field: 'group_id', allowNull: false })
  groupId: number;

  @BelongsTo(() => GroupTheater, 'group_id')
  group: GroupTheater;

  @BelongsToMany(() => Movie, () => TheaterMovie, 'theater_id')
  movies: Movie[];
}
