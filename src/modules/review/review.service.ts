import { Inject, Injectable } from '@nestjs/common';
import { Review } from './review.model';

@Injectable()
export class ReviewService {
  constructor(
    @Inject('REVIEWS_REPOSITORY') private reviewRepository: typeof Review
  ) {}
}
