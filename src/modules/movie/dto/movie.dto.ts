import { IsNotEmpty } from 'class-validator';
import { Bookmark } from 'src/modules/bookmark/bookmark.model';
import { User } from 'src/modules/user/user.model';

export type MMPARating = 'PA-13' | 'PA-16' | 'PA-18';

export interface MovieBooking {
  id: number;
  name: string;
}

export interface MovieItem {
  id: number;
  name: string;
  describe: string;
  director: string;
  publish: Date;
  run_time: number;
}

export interface MovieDetail {
  id: number;
  name: string;
  describe: string;
  director: string;
  writer: string;
  run_time: number;
  MMPA_rating: MMPARating;
  publish: Date;
  category_id: number;
  isBookmark?: boolean;
}

export class CreateMovie {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  describe: string;

  director: string;

  writer: string;

  @IsNotEmpty()
  run_time: number;

  @IsNotEmpty()
  MMPA_rating: MMPARating;

  publish: Date;
  category_id: number;
}

export class UpdateMovie extends CreateMovie {}
