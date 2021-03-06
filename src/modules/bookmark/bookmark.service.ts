import { Inject, Injectable } from '@nestjs/common';
import { Movie } from '../movie/movie.model';
import { Bookmark } from './bookmark.model';
import { BookmarkMovie } from './dto/bookmark.dto';

@Injectable()
export class BookmarkService {
  constructor(
    @Inject('BOOKMARKS_REPOSITORY') private bookmarkRepository: typeof Bookmark
  ) {}

  async countMovie(userId: number): Promise<number> {
    return this.bookmarkRepository.count({ where: { userId } });
  }

  async getFavoriteMovie(
    id: number,
    offset = 0,
    limit = 10,
    sort = 'name'
  ): Promise<Bookmark[]> {
    const bookmarks: Bookmark[] = await this.bookmarkRepository.findAll({
      where: {
        userId: id
      },
      include: [{ model: Movie }],
      offset: +offset,
      limit: +limit,
      order: [[{ model: Movie, as: 'movie' }, sort, 'DESC']]
    });

    return bookmarks;
  }

  async bookmarkMovie(userBookmark: Bookmark) {
    return this.bookmarkRepository.create(userBookmark);
  }
}
