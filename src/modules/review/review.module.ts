import { Module } from '@nestjs/common';
import { ReviewProviders } from './review.provider';
import { ReviewService } from './review.service';

@Module({
  providers: [ReviewService, ...ReviewProviders],
  exports: [ReviewService]
})
export class ReviewModule {}
