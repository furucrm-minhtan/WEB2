import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll<User>();
  }

  async findUser(userName: string): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        user_name: userName
      }
    });
  }
}
