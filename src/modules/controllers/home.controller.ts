import { Controller, Get, Inject, Render, Session } from '@nestjs/common';
import { MovieService } from '../movie/movie.service';

@Controller()
export class HomeController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  @Render('home')
  async root(@Session() session: Record<string, any>) {
    const newMovie = await this.movieService.newestMovie(10);
    const comingMovie = await this.movieService.comingMovie(90);

    return { newMovie, comingMovie };
  }
}
