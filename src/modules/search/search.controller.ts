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
      const movies: Movie[] = await this.searchService.movie(name);

      return this.actionResponseService.responseApi(true, movies, '');
    } catch (error) {
      console.log(error);
    }
    return this.actionResponseService.responseApi(false, [], '');
  }

  @Get('movie-avanced')
  async searchMovieAvanced() {
    try {
      const movies: Movie[] = await this.searchService.movie(name);

      return this.actionResponseService.responseApi(true, movies, '');
    } catch (error) {
      console.log(error);
    }
    return this.actionResponseService.responseApi(false, [], ''); 
  }
}
