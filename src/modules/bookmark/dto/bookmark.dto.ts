import { IsNotEmpty } from 'class-validator';

export class BookmarkMovie {
  @IsNotEmpty()
  movieId: number;
}