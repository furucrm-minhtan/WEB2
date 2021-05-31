import { Inject, Injectable } from '@nestjs/common';
import { UserReview } from './dto/review.dto';
import { Review } from './review.model';

@Injectable()
export class ReviewService {
  constructor(
    @Inject('REVIEWS_REPOSITORY') private reviewRepository: typeof Review
  ) {}

  async fetchReview(options = {}): Promise<Review[]> {
    return this.reviewRepository.findAll(options);
  }

  async createReview(userReview: UserReview) {
    return this.reviewRepository.create(userReview as Review);
  }
}
