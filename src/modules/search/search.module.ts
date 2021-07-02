import { Module } from '@nestjs/common';
import { ActionResponseModule } from '../actionResponse/actionresponse.module';
import { MovieModule } from '../movie/movie.module';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  imports: [MovieModule, ActionResponseModule],
  controllers: [SearchController],
  providers: [SearchService]
})
export class SearchModule {}
