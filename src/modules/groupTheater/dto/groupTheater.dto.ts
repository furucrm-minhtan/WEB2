import { IsNotEmpty } from 'class-validator';
export class GroupTheaterOptions {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  address: string;
}
