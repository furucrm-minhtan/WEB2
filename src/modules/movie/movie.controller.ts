import { Controller, Get, Param, Render } from '@nestjs/common';
import { GroupTheaterOptions } from '../groupTheater/dto/groupTheater.dto';
import { GroupTheater } from '../groupTheater/groupTheater.model';
import { GroupTheaterService } from '../groupTheater/grouptheater.service';
import { TheaterOptions } from '../theater/dto/theater.dto';
import { Theater } from '../theater/theater.model';
import { TheaterService } from '../theater/theater.service';
import { MovieBooking } from './dto/movie.dto';
import { Movie } from './movie.model';
import { MovieService } from './movie.service';

@Controller()
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('booking/:id')
  @Render('room')
  async loadRoomView(@Param('id') id: number): Promise<Record<string, any>> {
    try {
      return this.movieService.loadBookingPage(id);
    } catch (error) {
      console.log(error);
    }
  }
}
