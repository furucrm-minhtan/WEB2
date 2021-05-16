import {
  AutoIncrement,
  BelongsTo,
  Column,
  Default,
  ForeignKey,
  HasMany,
  PrimaryKey,
  Table
} from 'sequelize-typescript';
import { BaseModel } from './base.model';
import { Movie } from '../modules/movie/movie.model';

@Table({ tableName: 'Categories' })
export class Category extends BaseModel<Category> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({ allowNull: false })
  name: string;

  @Default(1)
  @Column
  level: number;

  @ForeignKey(() => Category)
  @Column({ field: 'parent_id' })
  ParentId: number;

  @BelongsTo(() => Category, 'parent_id')
  parent: Category;

  @HasMany(() => Category)
  children: Category[];

  @HasMany(() => Movie)
  movies: Movie[];
}
