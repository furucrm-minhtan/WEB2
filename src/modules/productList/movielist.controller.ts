import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Render
} from '@nestjs/common';
import { ActionResponseService } from '../actionResponse/actionresponse.service';
import { Movie } from '../movie/movie.model';
import { MovieListService } from './movietlist.service';

@Controller('movie-list')
export class MovieListController {
  constructor(
    private readonly movieListService: MovieListService,
    private readonly actionResponseService: ActionResponseService
  ) {}

  @Get(':cateId')
  @Render('movielist')
  async root(
    @Param('cateId', ParseIntPipe) cateId: number
  ): Promise<Record<string, any>> {
    try {
      const totalMovie: number = await this.movieListService.countMovie(cateId);

      return { cateId, totalMovie };
    } catch (error) {
      console.log(error);
    }

    return { cateId, totalMovie: 0 };
  }

  @Get(':cateId/fetch')
  async fetchMovieList(
    @Param('cateId', ParseIntPipe) cateId: number,
    @Query('offset', ParseIntPipe) offset: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('sort') sort: string
  ) {
    try {
      const movieList: Movie[] = await this.movieListService.fetchMovie(
        cateId,
        offset,
        limit,
        sort
      );

      return this.actionResponseService.responseApi(true, movieList, '');
    } catch (error) {
      console.log(error);
    }

    return this.actionResponseService.responseApi(false, [], '');
  }
}