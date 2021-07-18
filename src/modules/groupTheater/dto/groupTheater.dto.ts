import { IsNotEmpty } from 'class-validator';
export class GroupTheaterOptions {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  address: string;
}

export class AddGroup {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  address: string;
}

export class UpdateGroup extends AddGroup {}
