import { Injectable } from '@nestjs/common';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { UserAuthen } from './dto/authen.dto';

@Injectable()
export class AuthenService {
  constructor(private readonly userService: UserService) {}

  async validateUser({ userName, password }: UserAuthen): Promise<User> {
    const user: User = await this.userService.findUser(userName, { raw: true });
    if (user && bcrypt.compareSync(password, user.password)) return user;
    return null;
  }
}
