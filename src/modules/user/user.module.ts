import { Module } from '@nestjs/common';
import { BookmarkModule } from '../bookmark/bookmark.module';
import { MovieModule } from '../movie/movie.module';
import { UserController } from './user.controller';
import { UserProviders } from './user.providers';
import { UserService } from './user.service';

@Module({
  imports: [MovieModule, BookmarkModule],
  controllers: [UserController],
  providers: [UserService, ...UserProviders],
  exports: [UserService]
})
export class UserModule {}
