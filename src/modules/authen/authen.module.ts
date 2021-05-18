import { AuthenService } from './authen.service';
import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthenController } from './authen.controller';

@Module({
  imports: [UserModule],
  controllers: [AuthenController],
  providers: [AuthenService]
})
export class AuthenModule {}
