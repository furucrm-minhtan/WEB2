import { Inject, Injectable } from '@nestjs/common';
import { Movie } from '../movie/movie.model';
import { UserReview } from './dto/review.dto';
import { Review } from './review.model';

@Injectable()
export class ReviewService {
  constructor(
    @Inject('REVIEWS_REPOSITORY') private reviewRepository: typeof Review
  ) {}

  async countMovie(id: number): Promise<number> {
    return this.reviewRepository.count({ where: { id } });
  }

  async getRatingMovie(
    id: number,
    offset = 0,
    limit = 10,
    sort = 'name'
  ): Promise<Review[]> {
    const bookmarks: Review[] = await this.reviewRepository.findAll({
      where: {
        userId: id
      },
      include: [{ model: Movie, order: [sort] }],
      offset: +offset,
      limit: +limit
    });

    return bookmarks;
  }

  async fetchReview(options = {}): Promise<Review[]> {
    return this.reviewRepository.findAll(options);
  }

  async createReview(userReview: Review) {
    return this.reviewRepository.create(userReview);
  }
}
