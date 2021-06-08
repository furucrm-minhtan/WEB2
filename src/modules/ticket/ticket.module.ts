import { Module } from '@nestjs/common';
import { ActionResponseModule } from '../actionResponse/actionresponse.module';
import { SmsModule } from '../sms/sms.module';
import { UserModule } from '../user/user.module';
import { TicketController } from './ticket.controller';
import { TicketProviders } from './ticket.provide';
import { TicketService } from './ticket.service';

@Module({
  imports: [ActionResponseModule, UserModule, SmsModule],
  controllers: [TicketController],
  providers: [TicketService, ...TicketProviders]
})
export class TicketModule {}
