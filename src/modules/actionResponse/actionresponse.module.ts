import { Module } from '@nestjs/common';
import { ActionResponseService } from './actionresponse.service';

@Module({
  providers: [ActionResponseService],
  exports: [ActionResponseService]
})
export class ActionResponseModule {}
