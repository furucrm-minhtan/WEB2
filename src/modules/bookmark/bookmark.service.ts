import { Inject, Injectable } from '@nestjs/common';
import { Movie } from '../movie/movie.model';
import { Bookmark } from './bookmark.model';

@Injectable()
export class BookmarkService {
  constructor(
    @Inject('BOOKMARKS_REPOSITORY') private bookmarkRepository: typeof Bookmark
  ) {}

  async countMovie(id: number): Promise<number> {
    return this.bookmarkRepository.count({ where: { id } });
  }

  async getFavoriteMovie(
    id: number,
    offset = 0,
    limit = 10
  ): Promise<Bookmark[]> {
    const bookmarks: Bookmark[] = await this.bookmarkRepository.findAll({
      where: {
        id
      },
      include: [Movie],
      offset,
      limit
    });

    return bookmarks;
  }
}
