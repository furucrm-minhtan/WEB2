import { Module } from '@nestjs/common';
import { CategoryModule } from '../category/category.module';
import { MovieModule } from '../movie/movie.module';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';

@Module({
  imports: [MovieModule, CategoryModule],
  controllers: [HomeController],
  providers: [HomeService]
})
export class HomeModule {}
