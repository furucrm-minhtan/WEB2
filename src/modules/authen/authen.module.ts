import { AuthenService } from './authen.service';
import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthenController } from './authen.controller';
import { ActionResponseModule } from '../actionResponse/actionresponse.module';

@Module({
  imports: [UserModule, ActionResponseModule],
  controllers: [AuthenController],
  providers: [AuthenService]
})
export class AuthenModule {}
