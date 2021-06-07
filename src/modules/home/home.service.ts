import { Injectable } from '@nestjs/common';
import { MovieService } from '../movie/movie.service';

@Injectable()
export class HomeService {
  constructor(private readonly movieService: MovieService) {}

  async homePage() {
    const newMovie = await this.movieService.newestMovie(10);
    const comingMovie = await this.movieService.comingMovie(10);
    const topMovie = await this.movieService.topRatedMovie(10);

    return { newMovie, comingMovie, topMovie };
  }
}
