import { Body, Controller, Post, Session } from '@nestjs/common';
import { User } from '../user/user.model';
import { AuthenService } from './authen.service';
import { UserAuthen } from './dto/authen.dto';

@Controller('authen')
export class AuthenController {
  constructor(private readonly authenService: AuthenService) {}

  @Post('/login')
  async userAuthentication(
    @Session() session: Record<string, any>,
    @Body() { userName, password }: UserAuthen
  ): Promise<boolean> {
    let user: User;

    try {
      user = await this.authenService.validateUser(userName, password);

      if (user) {
        session.userName = user.user_name;
        session.isAdmin = user.is_admin;
      }
    } catch (error) {
      console.log(error);
    }

    return user != null;
  }
}
