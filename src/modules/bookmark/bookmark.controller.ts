import { Body, Controller, Get, Param, Query, Session } from '@nestjs/common';
import session from 'express-session';
import { ActionResponseService } from '../actionResponse/actionresponse.service';
import { UserSession } from '../authen/dto/authen.dto';
import { Bookmark } from './bookmark.model';
import { BookmarkService } from './bookmark.service';

@Controller('bookmark')
export class BookmarkController {
  constructor(
    private readonly bookmarkService: BookmarkService,
    private readonly actionResponse: ActionResponseService
  ) {}

  @Get()
  async fetchBookmark(
    @Session() { user }: { user: UserSession },
    @Query() { offset, limit }: { offset: number; limit: number }
  ): Promise<ActionResponseService> {
    // const { id }: { id: number } = user;
    try {
      const id = 1;
      const data: Bookmark[] = await this.bookmarkService.getFavoriteMovie(
        id,
        offset,
        limit
      );

      return this.actionResponse.responseApi(true, data, '');
    } catch (error) {
      console.log(error);
    }

    return this.actionResponse.responseApi(true, [], 'error');
  }

  @Get('init')
  async fetchBookmarkInformation(
    @Session() { user }: { user: UserSession },
    @Query() { limit }: { limit: number }
  ) {
    //const { id }: { id: number } = user;
    try {
      const id = 1;
      const totalBookmark: number = await this.bookmarkService.countMovie(id);
      const page = Math.ceil(totalBookmark / limit);

      return this.actionResponse.responseApi(true, { totalBookmark, page }, '');
    } catch (error) {
      console.log(error);
    }

    return this.actionResponse.responseApi(true, '', 'error');
  }
}
