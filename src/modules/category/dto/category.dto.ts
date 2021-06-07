import { IsNotEmpty } from 'class-validator';

export class AddCategory {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  level: string;
}

export class UpdateCategory extends AddCategory {}
