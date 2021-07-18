import { Body, Controller, Get, Param, Post, Query, Session } from '@nestjs/common';
import session from 'express-session';
import { ActionResponseService } from '../actionResponse/actionresponse.service';
import { UserSession } from '../authen/dto/authen.dto';
import { Bookmark } from './bookmark.model';
import { BookmarkService } from './bookmark.service';
import { BookmarkMovie } from './dto/bookmark.dto';

@Controller('bookmark')
export class BookmarkController {
  constructor(
    private readonly bookmarkService: BookmarkService,
    private readonly actionResponse: ActionResponseService
  ) {}

  @Get()
  async fetchBookmark(
    @Session() { user }: { user: UserSession },
    @Query()
    { offset, limit, sort }: { offset: number; limit: number; sort: string }
  ): Promise<ActionResponseService> {
    const { id }: { id: number } = user;
    try {
      const data: Bookmark[] = await this.bookmarkService.getFavoriteMovie(
        id,
        offset,
        limit,
        sort
      );

      return this.actionResponse.responseApi(true, data, '');
    } catch (error) {
      console.log(error);
    }

    return this.actionResponse.responseApi(true, [], 'error');
  }

  @Get('user')
  async fetchBookmarkInformation(@Session() { user }: { user: UserSession }) {
    const { id }: { id: number } = user;
    try {
      const totalBookmark: number = await this.bookmarkService.countMovie(id);

      return this.actionResponse.responseApi(true, { totalBookmark }, '');
    } catch (error) {
      console.log(error);
    }

    return this.actionResponse.responseApi(true, '', 'error');
  }

  @Post()
  async bookmarkMovie(
    @Session() { user }: { user: UserSession },
    @Body() userBookmark: BookmarkMovie
  ) {
    let message = '';

    try {
      const id = user?.id;

      if (!id) throw 'To use this feature you must authen';
      await this.bookmarkService.bookmarkMovie({
        userId: id,
        ...userBookmark
      } as Bookmark);

      return this.actionResponse.responseApi(true, '', 'bookmark success');
    } catch (error) {
      console.log(error);
      message = error;
    }

    return this.actionResponse.responseApi(false, '', message);
  }
}
