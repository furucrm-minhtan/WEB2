import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Render,
  Session
} from '@nestjs/common';
import { col, fn } from 'sequelize';
import { ActionResponseService } from '../actionResponse/actionresponse.service';
import { UserSession } from '../authen/dto/authen.dto';
import { Bookmark } from '../bookmark/bookmark.model';
import { GroupTheaterOptions } from '../groupTheater/dto/groupTheater.dto';
import { GroupTheater } from '../groupTheater/groupTheater.model';
import { GroupTheaterService } from '../groupTheater/grouptheater.service';
import { Review } from '../review/review.model';
import { TheaterOptions } from '../theater/dto/theater.dto';
import { Theater } from '../theater/theater.model';
import { TheaterService } from '../theater/theater.service';
import { TheaterMovie } from '../theaterMovie/theaterMovie.model';
import { User } from '../user/user.model';
import {
  CreateMovie,
  MovieBooking,
  MovieDetail,
  MovieItem,
  UpdateMovie
} from './dto/movie.dto';
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
    @Param('id', ParseIntPipe) id: number
  ): Promise<Record<string, any>> {
    try {
      return this.movieService.getDetailMovie(id, user?.id);
    } catch (error) {
      console.log(error);
    }
  }

  @Get(':id/booking')
  @Render('room')
  async loadRoomView(
    @Session() session: Record<string, any>,
    @Param('id') id: number
  ): Promise<Record<string, any>> {
    try {
      const userId: string = session?.user?.id;
      const data = await this.movieService.loadBookingPage(id);

      return { ...data, userId };
    } catch (error) {
      console.log(error);
    }
  }

  @Get(':id/review')
  async fetchReviewMovie(@Param('id') id: number) {
    try {
      const reviews: User[] = await this.movieService.fetchReviewMovie(id);

      return this.actionResponseService.responseApi(true, reviews, '');
    } catch (error) {
      console.log(error);
    }
    return this.actionResponseService.responseApi(false, [], '');
  }

  @Get()
  async fetchMovie() {
    try {
      const movies: Movie[] = await this.movieService.findAll();

      return this.actionResponseService.responseApi(true, movies, '');
    } catch (error) {
      console.log(error);
    }
    return this.actionResponseService.responseApi(false, [], '');
  }

  @Post()
  async create(
    @Body() { data, theaters }: { data: CreateMovie; theaters: number[] }
  ) {
    try {
      console.log(theaters);
      const movie: Movie = await this.movieService.createMovie(data as Movie);
      movie.theaters = theaters.reduce((result, id) => {
        result.push(Theater.build({ id } as Theater));
        return result;
      }, []);
      movie.save();
      return this.actionResponseService.responseApi(true, movie, '');
    } catch (error) {
      console.log(error);
    }
    return this.actionResponseService.responseApi(false, [], '');
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateMovie
  ) {
    try {
      const movie: [number, Movie[]] = await this.movieService.updateMovie(
        id,
        data as Movie
      );

      return this.actionResponseService.responseApi(true, movie, '');
    } catch (error) {
      console.log(error);
    }
    return this.actionResponseService.responseApi(false, [], '');
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      const deleted: number = await this.movieService.deleteMovie(id);

      return this.actionResponseService.responseApi(true, deleted, '');
    } catch (error) {
      console.log(error);
    }
    return this.actionResponseService.responseApi(false, [], '');
  }
}
