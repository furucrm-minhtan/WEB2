import { Controller, Get, Inject, Render, Session } from '@nestjs/common';
import { MovieService } from '../movie/movie.service';
import { HomeService } from './home.service';

@Controller()
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  @Render('home')
  async root() {
    try {
      return this.homeService.homePage();
    } catch (error) {
      console.log(error);
    }
  }
}
