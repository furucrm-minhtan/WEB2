import { Body, Controller, Get, Post, Render, Session } from '@nestjs/common';
import { ActionResponseService } from '../actionResponse/actionresponse.service';
import { UserSession } from '../authen/dto/authen.dto';
import { Bookmark } from '../bookmark/bookmark.model';
import { BookmarkService } from '../bookmark/bookmark.service';
import { Movie } from '../movie/movie.model';
import { ChangePassword, UserProfile, UserRegister } from './dto/user.dto';
import { User } from './user.model';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly bookmarkService: BookmarkService,
    private readonly actionResponseService: ActionResponseService
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

  @Post('/forgot-password')
  async forgotPassword(
    @Session() session: Record<string, any>,
    @Body('email') email: string
  ): Promise<Record<string, any>> {
    try {
      await this.userService.sendMailForgotPassword(session, email);

      return this.actionResponseService.responseApi(
        true,
        '',
        'mail is sent, please check your email'
      );
    } catch (error) {
      console.log(error);
    }
    return this.actionResponseService.responseApi(
      false,
      '',
      'send mail is failed'
    );
  }

  @Post('/registration')
  async userRegistration(
    @Body() user: UserRegister
  ): Promise<Record<string, any>> {
    try {
      await this.userService.createNewUser(user);

      return this.actionResponseService.responseApi(
        true,
        '',
        'create user success, please check your email to verify'
      );
    } catch (error) {
      console.log(error);
    }
    return this.actionResponseService.responseApi(
      false,
      '',
      'create user failed'
    );
  }
}
