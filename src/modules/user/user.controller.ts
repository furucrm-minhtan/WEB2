import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Render,
  Session,
  Headers,
  Put
} from '@nestjs/common';
import { ActionResponseService } from '../actionResponse/actionresponse.service';
import { UserSession } from '../authen/dto/authen.dto';
import { BookmarkService } from '../bookmark/bookmark.service';
import { Movie } from '../movie/movie.model';
import {
  ChangePassword,
  ResetPassword,
  UserProfile,
  UserRegister
} from './dto/user.dto';
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
    const { id }: UserProfile = session.user;
    // const bookmarks: Bookmark[] = await this.bookmarkService.getFavoriteMovie(
    //   1
    // );
    const user: UserProfile = await this.userService.loadProfileView(id);

    return { ...user };
  }

  @Put('/profile')
  async updateProflie(@Body() user: UserProfile): Promise<Record<string, any>> {
    try {
      await this.userService.updateProfile(user as User);

      return this.actionResponseService.responseApi(
        true,
        '',
        'update profile completed'
      );
    } catch (error) {
      console.log(error);
    }

    return this.actionResponseService.responseApi(
      false,
      '',
      'update profile failed'
    );
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
    @Headers('origin') host: string,
    @Session() session: Record<string, any>,
    @Body('email') email: string
  ): Promise<Record<string, any>> {
    try {
      await this.userService.sendMailForgotPassword(host, session, email);

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

  @Get('reset-password')
  @Render('resetPassword')
  async renderResetPassword(
    @Query('token') token: string
  ): Promise<Record<string, any>> {
    return { token, resetCompleted: true };
  }

  @Post('reset-password')
  @Render('resetPassword')
  async resetPassword(
    @Session() session: Record<string, any>,
    @Query('token') user_token: string,
    @Body() { password }: ResetPassword
  ): Promise<Record<string, any>> {
    const { email, token } = session.resetPassword;
    let message = '';

    try {
      if (token !== user_token) {
        throw 'token is invalid';
      }
      await this.userService.resetPassword(email, password);

      return { resetCompleted: true };
    } catch (error) {
      console.log(error);
      message = error;
    }

    return { message, token };
  }

  @Post('/registration')
  async userRegistration(
    @Headers('origin') host: string,
    @Body() user: UserRegister
  ): Promise<Record<string, any>> {
    try {
      await this.userService.createNewUser(host, user);

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

  @Put('user/avatar')
  async uploadAvatar(
    @Session() session: Record<string, any>,
    @Body('avatar') avatar: string
  ) {
    let message = '';

    try {
      const userSession: UserSession = session?.user;

      if (!userSession) {
        throw new Error('user not authen');
      }

      this.userService.uploadAvatar(userSession.id, avatar);

      return this.actionResponseService.responseApi(
        true,
        '',
        'upload avatar completed'
      );
    } catch (error) {
      message = error;
      console.log(error);
    }

    return this.actionResponseService.responseApi(false, '', message);
  }
}
