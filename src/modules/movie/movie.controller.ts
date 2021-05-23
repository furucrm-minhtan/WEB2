import { Controller, Get, Param, Render } from '@nestjs/common';
import { GroupTheater } from '../groupTheater/groupTheater.model';
import { GroupTheaterService } from '../groupTheater/grouptheater.service';
import { MovieBooking } from './dto/movie.dto';
import { Movie } from './movie.model';
import { MovieService } from './movie.service';

@Controller()
export class MovieController {
  constructor(
    private readonly movieService: MovieService,
    private readonly groupTheaterService: GroupTheaterService
  ) {}

  @Get('booking/:id')
  @Render('room')
  async loadRoomView(@Param('id') id: number): Promise<Record<string, any>> {
    try {
      const movie: MovieBooking = await this.movieService.findMovie(id, {
        include: [{ model: Movie, include: [GroupTheater] }],
        raw: true
      });

      return { ...movie };
    } catch (error) {
      console.log(error);
    }
  }
}
