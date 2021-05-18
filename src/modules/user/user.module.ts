import { Module } from '@nestjs/common';
import { UserProviders } from './user.providers';
import {UserController} from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, ...UserProviders]
})
export class UserModule {}
