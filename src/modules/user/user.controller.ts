import { Body, Controller, Get, Post, Render, Session } from '@nestjs/common';
import { ActionResponseService } from '../actionResponse/actionresponse.service';
import { UserSession } from '../authen/dto/authen.dto';
import { Bookmark } from '../bookmark/bookmark.model';
import { BookmarkService } from '../bookmark/bookmark.service';
import { Movie } from '../movie/movie.model';
import { ChangePassword, UserProfile } from './dto/user.dto';
import { User } from './user.model';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly bookmarkService: BookmarkService,
    private readonly actionResponse: ActionResponseService
  ) {}

  @Get('/dashboard')
  @Render('userprofile')
  async root(@Session() session: Record<string, any>): Promise<UserProfile> {
    // console.log(session);
    // const { id }: UserProfile = session.user;
    // const bookmarks: Bookmark[] = await this.bookmarkService.getFavoriteMovie(
    //   1
    // );
    const user: UserProfile = await this.userService.loadProfileView(1);

    return { ...user };
  }

  @Post('/profile')
  async updateProflie(@Body() user: UserProfile): Promise<boolean> {
    try {
      await this.userService.updateProfile(user as User);

      return true;
    } catch (error) {
      console.log(error);
    }

    return false;
  }

  @Get('/favorite')
  async getFavoriteMovie(@Session() session: UserSession): Promise<Movie> {
    return await this.getFavoriteMovie(session);
  }

  @Post('/change-password')
  async updatePassword(
    @Session() { id }: UserSession,
    @Body() password: ChangePassword
  ): Promise<boolean> {
    try {
      await this.userService.updatePassword(id, password);

      return true;
    } catch (error) {
      console.log(error);
    }

    return false;
  }
}
