import { Body, Controller, Get, Post, Render, Session } from '@nestjs/common';
import session from 'express-session';
import { UserSession } from '../authen/dto/authen.dto';
import { Movie } from '../movie/movie.model';
import { ChangePassword, UserProfile } from './dto/user.dto';
import { User } from './user.model';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/dashboard')
  @Render('userprofile')
  async root(@Session() session: Record<string, any>): Promise<UserProfile> {
    const movie: Movie[] = await this.userService.getFavoriteMovie(1);
    const user: UserProfile = await this.userService.loadProfileView(session);
    console.log(movie);
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
