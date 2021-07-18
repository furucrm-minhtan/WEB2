import { IsNotEmpty } from 'class-validator';

export interface TheaterOptions {
  id: number;
  name: string;
}

export class CreateTheater {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  groupId: string;
}

export class UpdateTheater {}
