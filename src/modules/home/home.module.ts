import { Module } from '@nestjs/common';
import { MovieModule } from '../movie/movie.module';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';

@Module({
  imports: [MovieModule],
  controllers: [HomeController],
  providers: [HomeService]
})
export class HomeModule {}
