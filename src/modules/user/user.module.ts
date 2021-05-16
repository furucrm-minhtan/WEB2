import { Module } from '@nestjs/common';
import { UserProviders } from './user.providers';
import { UserService } from './user.service';

@Module({
  providers: [UserService, ...UserProviders]
})
export class UserModule {}
