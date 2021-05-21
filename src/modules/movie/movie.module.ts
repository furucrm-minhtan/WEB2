import { Module } from '@nestjs/common';
import { HomeController } from '../controllers/home.controller';
import { MovieProviders } from './movie.provider';
import { MovieService } from './movie.service';

@Module({
  controllers: [HomeController],
  providers: [MovieService, ...MovieProviders],
  exports: [MovieService, ...MovieProviders]
})
export class MovieModule {}
