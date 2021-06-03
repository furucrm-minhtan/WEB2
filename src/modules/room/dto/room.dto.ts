import { IsNotEmpty } from 'class-validator';

export class CreateRoom {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  rows: number;

  @IsNotEmpty()
  columns: number;
}

export class UpdateRoom extends CreateRoom {}
