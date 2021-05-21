import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { TicketProviders } from './ticket.provide';
import { TicketService } from './ticket.service';

@Module({
  controllers: [TicketController],
  providers: [TicketService, ...TicketProviders]
})
export class TicketModule {}
