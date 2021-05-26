import { Module } from '@nestjs/common';
import { ActionResponseModule } from '../actionResponse/actionresponse.module';
import { BookmarkController } from './bookmark.controller';
import { BookmarkProviders } from './bookmark.provider';
import { BookmarkService } from './bookmark.service';

@Module({
  imports: [ActionResponseModule],
  controllers: [BookmarkController],
  providers: [BookmarkService, ...BookmarkProviders],
  exports: [BookmarkService]
})
export class BookmarkModule {}
