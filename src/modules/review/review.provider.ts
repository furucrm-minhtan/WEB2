import { Review } from './review.model';

export const ReviewProviders = [
  {
    provide: 'REVIEWS_REPOSITORY',
    useValue: Review
  }
];
