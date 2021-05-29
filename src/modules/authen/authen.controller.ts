import { Body, Controller, Post, Session } from '@nestjs/common';
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
