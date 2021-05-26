import { Injectable, Inject } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { TicketBooking } from './dto/ticket.dto';
import { Ticket } from './ticket.model';

@Injectable()
export class TicketService {
  constructor(
    @Inject('TICKETS_REPOSITORY') private ticketRepository: typeof Ticket
  ) {}

  booking(ticketBooking: TicketBooking) {
    return this.ticketRepository.create(ticketBooking as Ticket);
  }
}
