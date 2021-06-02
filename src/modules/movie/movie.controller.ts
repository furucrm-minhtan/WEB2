import { Controller, Get, Param, Query, Render, Session } from '@nestjs/common';
import { ActionResponseService } from '../actionResponse/actionresponse.service';
import { UserSession } from '../authen/dto/authen.dto';
import { Bookmark } from '../bookmark/bookmark.model';
import { GroupTheaterOptions } from '../groupTheater/dto/groupTheater.dto';
import { GroupTheater } from '../groupTheater/groupTheater.model';
import { GroupTheaterService } from '../groupTheater/grouptheater.service';
import { TheaterOptions } from '../theater/dto/theater.dto';
import { Theater } from '../theater/theater.model';
import { TheaterService } from '../theater/theater.service';
import { User } from '../user/user.model';
import { MovieBooking, MovieDetail, MovieItem } from './dto/movie.dto';
import { Movie } from './movie.model';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
  constructor(
    private readonly movieService: MovieService,
    private readonly actionResponseService: ActionResponseService
  ) {}

  @Get(':id')
  @Render('detail')
  async loadMovieDetail(
    @Session() { user }: { user: UserSession },
    @Param('id') id: number
  ): Promise<Record<string, any>> {
    const fetchOptions: Record<string, any> = { raw: true };
    const userId = user?.id;
    if (userId)
      fetchOptions.include = [
        {
          attributes: ['id'],
          model: User,
          as: 'userFavorites',
          where: { id: userId }
        }
      ];
    const movieDetail: MovieDetail = await this.movieService.findMovie(
      id,
      fetchOptions
    );
    movieDetail.isBookmark = movieDetail['userFavorites.id'] != null;
    const releatedMovie: MovieItem[] = await this.movieService.findAll({
      where: { category_id: movieDetail.category_id },
      limit: 5
    });

    return { ...movieDetail, releatedMovie };
  }

  @Get(':id/booking')
  @Render('room')
  async loadRoomView(@Param('id') id: number): Promise<Record<string, any>> {
    try {
      return this.movieService.loadBookingPage(id);
    } catch (error) {
      console.log(error);
    }
  }

  @Get('search')
  async searchMovieBasic(@Query('name') name: string) {
    try {
      const movies: Movie[] = await this.movieService.findAll({
        where: {
          name
        }
      });

      return this.actionResponseService.responseApi(true, movies, '');
    } catch (error) {
      console.log(error);
    }
    return this.actionResponseService.responseApi(false, [], '');
  }

  @Get(':id/review')
  async fetchReviewMovie(@Query('id') id: number) {
    try {
      const movies: Movie[] = await this.movieService.fetchReviewMovie(id);

      return this.actionResponseService.responseApi(true, movies, '');
    } catch (error) {
      console.log(error);
    }
    return this.actionResponseService.responseApi(false, [], '');
  }
}
