import { Transform } from 'class-transformer';

export class PagingDTO {
  offset: number;
  limit: number;
  sort?: string;
}
