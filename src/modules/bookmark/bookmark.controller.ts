import { Body, Controller, Get, Session } from '@nestjs/common';
import session from 'express-session';
import { UserSession } from '../authen/dto/authen.dto';
import { BookmarkService } from './bookmark.service';

@Controller('/bookmark')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Get()
  async fetchBookmark(
    @Session() { user }: { user: UserSession },
    @Body() { offset, limit }: { offset: number; limit: number }
  ) {
    const { id }: { id: number } = user;
    return await this.bookmarkService.getFavoriteMovie(id, offset, limit);
  }
}
