import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Render,
  Session,
  Headers,
  Redirect,
  Res
} from '@nestjs/common';
import { Response } from 'express';
import { ActionResponseService } from '../actionResponse/actionresponse.service';
import { User } from '../user/user.model';
import { AuthenService } from './authen.service';
import { UserAuthen, UserSession } from './dto/authen.dto';

@Controller('authen')
export class AuthenController {
  constructor(
    private readonly authenService: AuthenService,
    private readonly actionResponseService: ActionResponseService
  ) {}

  @Get('verify-register')
  @Render('verifyRegister')
  async renderVerifyRegister(
    @Query('token') token: string
  ): Promise<Record<string, any>> {
    try {
      const isVerified: boolean = await this.authenService.userIsVerify(token);

      return { isVerified, token };
    } catch (error) {
      console.log(error);
    }

    return { isVerified: false, token };
  }

  @Post('verify-register')
  @Render('verifyRegister')
  async verifyRegister(
    @Headers('origin') host: string,
    @Query('token') token: string
  ): Promise<Record<string, any>> {
    try {
      await this.authenService.verifiedRegister(token);

      return { isVerified: true };
    } catch (error) {
      console.log(error);
    }
    return { isVerified: false, token };
  }

  @Post('/login')
  async userAuthentication(
    @Session() session: Record<string, any>,
    @Body() body: Record<string, any>
  ): Promise<ActionResponseService> {
    let user: User;

    try {
      user = await this.authenService.validateUser(body as UserAuthen);

      if (user) {
        const userSession: UserSession = user;
        session.user = userSession;

        return this.actionResponseService.responseApi(true, '', '');
      }

      return this.actionResponseService.responseApi(
        false,
        '',
        'user not exist or wrong password'
      );
    } catch (error) {
      console.log(error);
    }

    return this.actionResponseService.responseApi(false, '', 'Authen falied');
  }
}
