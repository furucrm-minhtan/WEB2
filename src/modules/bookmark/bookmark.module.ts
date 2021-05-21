import { Module } from '@nestjs/common';
import { BookmarkProviders } from './bookmark.provider';
import { BookmarkService } from './bookmark.service';

@Module({
  providers: [BookmarkService, ...BookmarkProviders],
  exports: [BookmarkService]
})
export class BookmarkModule {}
