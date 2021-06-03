import { IsNotEmpty } from 'class-validator';

export class AddCategory {
  @IsNotEmpty()
  name: string;
}

export class UpdateCategory extends AddCategory {}
