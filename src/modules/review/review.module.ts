import { Module } from '@nestjs/common';
import { ActionResponseModule } from '../actionResponse/actionresponse.module';
import { ReviewController } from './review.controller';
import { ReviewProviders } from './review.provider';
import { ReviewService } from './review.service';

@Module({
  imports: [ActionResponseModule],
  controllers: [ReviewController],
  providers: [ReviewService, ...ReviewProviders],
  exports: [ReviewService]
})
export class ReviewModule {}
