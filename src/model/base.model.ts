import {
  CreatedAt,
  UpdatedAt,
  Model,
  DataType,
  Column
} from 'sequelize-typescript';

export class BaseModel<T> extends Model<T> {
  @CreatedAt
  @Column(DataType.DATE)
  creationDate: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedOn: Date;
}
