import { Inject, Injectable } from '@nestjs/common';
import { Movie } from '../movie/movie.model';
import { Bookmarks } from './bookmark.model';

@Injectable()
export class BookmarkService {
  constructor(
    @Inject('BOOKMARKS_REPOSITORY') private bookmarkRepository: typeof Bookmarks
  ) {}

//   async getFavoriteMovie(id: number): Promise<Movie> {
//       this.bookmarkRepository.findAll({
//           where: {
//               userId: id
//           },
//           include: {

//           }
//       })
//   }
}
