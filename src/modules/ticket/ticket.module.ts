import { Module } from '@nestjs/common';
import { ActionResponseModule } from '../actionResponse/actionresponse.module';
import { TicketController } from './ticket.controller';
import { TicketProviders } from './ticket.provide';
import { TicketService } from './ticket.service';

@Module({
  imports: [ActionResponseModule],
  controllers: [TicketController],
  providers: [TicketService, ...TicketProviders]
})
export class TicketModule {}
