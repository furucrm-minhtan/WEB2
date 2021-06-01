import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Session
} from '@nestjs/common';
import { ActionResponseService } from '../actionResponse/actionresponse.service';
import { UserSession } from '../authen/dto/authen.dto';
import { UserReview } from './dto/review.dto';
import { Review } from './review.model';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly actionResponseService: ActionResponseService
  ) {}

  @Get()
  async fetchReview(
    @Session() { user }: { user: UserSession },
    @Query()
    { offset, limit, sort }: { offset: number; limit: number; sort: string }
  ): Promise<ActionResponseService> {
    // const { id }: { id: number } = user;
    try {
      const id = 1;
      const data: Review[] = await this.reviewService.getRatingMovie(
        id,
        offset,
        limit
      );

      return this.actionResponseService.responseApi(true, data, '');
    } catch (error) {
      console.log(error);
    }

    return this.actionResponseService.responseApi(true, [], 'error');
  }

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

  @Get('user')
  async fetchReviewInformation(
    @Session() { user }: { user: UserSession },
    @Query() { limit }: { limit: number }
  ) {
    const { id }: { id: number } = user;
    try {
      const totalBookmark: number = await this.reviewService.countMovie(id);
      const page = Math.ceil(totalBookmark / limit) | 1;

      return this.actionResponseService.responseApi(
        true,
        { totalBookmark, page },
        ''
      );
    } catch (error) {
      console.log(error);
    }

    return this.actionResponseService.responseApi(true, '', 'error');
  }

  @Post()
  async createReviewsMovie(
    @Session() { user }: { user: UserSession },
    @Body() body: UserReview
  ) {
    let message = '';

    try {
      const { id } = user;

      if (!id) throw 'To use this feature you must authen';
      await this.reviewService.createReview({
        userId: id,
        ...body
      } as Review);

      return this.actionResponseService.responseApi(
        true,
        '',
        'upload review completed'
      );
    } catch (error) {
      console.log(error);
      message = error;
    }

    return this.actionResponseService.responseApi(false, '', message);
  }
}
