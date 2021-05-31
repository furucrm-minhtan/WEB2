import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ActionResponseService } from '../actionResponse/actionresponse.service';
import { UserReview } from './dto/review.dto';
import { Review } from './review.model';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly actionResponseService: ActionResponseService
  ) {}

  @Get(':id')
  async fetchReviewsMovie(@Param('id') movieId: number) {
    try {
      return await this.reviewService.fetchReview({
        where: {
          movieId
        },
        raw: true
      });
    } catch (error) {}
  }

  @Post(':id')
  async createReviewsMovie(
    @Param('id') movieId: number,
    @Body() userReview: UserReview
  ) {
    try {
      await this.reviewService.createReview(userReview);

      return this.actionResponseService.responseApi(true, '', '');
    } catch (error) {
      console.log(error);
    }

    return this.actionResponseService.responseApi(false, '', '');
  }
}
