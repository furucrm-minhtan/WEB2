import { Transform } from 'class-transformer';

export class PagingDTO {
  @Transform((offset) => Number(offset), { toClassOnly: true })
  offset: number;
  @Transform((limit) => Number(limit), { toClassOnly: true })
  limit: number;
  sort?: string;
}
