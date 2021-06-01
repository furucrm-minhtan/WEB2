import { IsNotEmpty } from 'class-validator';

export class UserReview {
  @IsNotEmpty()
  rate: number;
  @IsNotEmpty()
  context: string;
  @IsNotEmpty()
  movieId: number;
}
