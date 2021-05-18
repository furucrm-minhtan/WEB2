import { Body, Inject, Injectable } from '@nestjs/common';
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

  async create(): Promise<User> {
    return this.usersRepository.create();
}
}
