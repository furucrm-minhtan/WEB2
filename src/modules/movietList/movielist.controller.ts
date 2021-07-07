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
import helper from '../../helper/helper';

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
    @Param('cateId', ParseIntPipe) cateId: number,
    @Query('name') name: string,
    @Query('release') releaseDate: string,
    @Query('group') group: string,
    @Query('theater') theater: string,
    @Query('showtime') showTime: string
  ): Promise<Record<string, any>> {
    try {
      // const totalMovie: number = await this.movieListService.countMovie(cateId);
      // const movies: Movie[] = await this.searchService.movie({
      //   cateId,
      //   name,
      //   releaseDate,
      //   group,
      //   theater,
      //   showTime,
      //   order: {
      //     field: 'name',
      //     order: 'DESC'
      //   }
      // });
      const groups: GroupTheater[] = await this.groupTheaterService.findAll({
        raw: true
      });
      const categories = await this.cateService.fetchCategory({
        order: [['level', 'DESC']],
        limit: 5,
        raw: true
      });
      return {
        cateId,
        groups: JSON.stringify(groups),
        categories
      };
    } catch (error) {
      console.log(error);
    }

    return { cateId, groups: '', categories: [] };
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
