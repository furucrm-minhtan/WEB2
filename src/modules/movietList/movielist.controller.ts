import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Render
} from '@nestjs/common';
import { ActionResponseService } from '../actionResponse/actionresponse.service';
import { CategoryService } from '../category/category.service';
import { GroupTheater } from '../groupTheater/groupTheater.model';
import { GroupTheaterService } from '../groupTheater/grouptheater.service';
import { Movie } from '../movie/movie.model';
import { SearchService } from '../search/search.service';
import { MovieListService } from './movietlist.service';

@Controller('movie-list')
export class MovieListController {
  constructor(
    private readonly movieListService: MovieListService,
    private readonly actionResponseService: ActionResponseService,
    private readonly groupTheaterService: GroupTheaterService,
    private readonly cateService: CategoryService,
    private readonly searchService: SearchService
  ) {}

  @Get(':cateId')
  @Render('movielist')
  async root(
    @Param('cateId', ParseIntPipe) cateId: number
  ): Promise<Record<string, any>> {
    try {
      const groups: GroupTheater[] = await this.groupTheaterService.findAll({
        raw: true
      });
      return {
        cateId,
        groups: JSON.stringify(groups)
      };
    } catch (error) {
      console.log(error);
    }

    return { cateId, groups: '' };
  }

  @Get(':cateId/fetch')
  async fetchMovieList(
    @Param('cateId', ParseIntPipe) cateId: number,
    @Query('offset', ParseIntPipe) offset: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('sortField') sortField: string,
    @Query('sortType') sortType: string
  ) {
    try {
      const movies: Movie[] = await this.searchService.movie({
        cateId,
        paginate: {
          offset,
          limit
        },
        order: {
          field: sortField,
          order: sortType
        }
      });

      return this.actionResponseService.responseApi(true, movies, '');
    } catch (error) {
      console.log(error);
    }

    return this.actionResponseService.responseApi(false, [], '');
  }
}
