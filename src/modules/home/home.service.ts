import { Injectable } from '@nestjs/common';
import { CategoryService } from '../category/category.service';
import { MovieService } from '../movie/movie.service';

@Injectable()
export class HomeService {
  constructor(
    private readonly movieService: MovieService,
    private readonly cateService: CategoryService
  ) {}

  async homePage() {
    const newMovie = await this.movieService.newestMovie(10);
    const comingMovie = await this.movieService.comingMovie(10);
    const topMovie = await this.movieService.topRatedMovie(10);
    const mostViewed = await this.movieService.mostViewed(10);

    return { newMovie, comingMovie, topMovie, mostViewed };
  }
}
