import { Module } from '@nestjs/common';
import { CategoryModule } from '../category/category.module';
import { GroupThearterModule } from '../groupTheater/groupthearter.module';
import { MovieModule } from '../movie/movie.module';
import { TheaterModule } from '../theater/theater.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [MovieModule, GroupThearterModule, CategoryModule, TheaterModule],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
