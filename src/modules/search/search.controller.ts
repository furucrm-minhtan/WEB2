import { Controller, Get, Query } from '@nestjs/common';
import { ActionResponseService } from '../actionResponse/actionresponse.service';
import { Movie } from '../movie/movie.model';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(
    private readonly searchService: SearchService,
    private readonly actionResponseService: ActionResponseService
  ) {}

  @Get('movie')
  async searchMovieBasic(@Query('name') name: string) {
    try {
      const movies: Movie[] = await this.searchService.movie({ name });

      return this.actionResponseService.responseApi(true, movies, '');
    } catch (error) {
      console.log(error);
    }
    return this.actionResponseService.responseApi(false, [], '');
  }

  @Get('movie-full')
  async searchMovieAvanced(
    @Query('cateId') cateId: string,
    @Query('name') name: string,
    @Query('rating') rating: string,
    @Query('group') group: string,
    @Query('theater') theater: string,
    @Query('showTimeFrom') showTimeFrom: string
  ) {
    try {
      const options = {};

      if (cateId) options['cateId'] = +cateId;
      if (showTimeFrom) {
        const dateTime = showTimeFrom.split('T');
        options['showTimeFrom'] = { date: dateTime[0], time: dateTime[1] };
      }

      const movies: Movie[] = await this.searchService.movie({
        name,
        rating,
        group,
        theater,
        ...options
      });

      return this.actionResponseService.responseApi(true, movies, '');
    } catch (error) {
      console.log(error);
    }
    return this.actionResponseService.responseApi(false, [], '');
  }
}
