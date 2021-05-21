import { Injectable, Inject } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { TicketBooking } from './dto/ticket.dto';
import { Ticket } from './ticket.model';

@Injectable()
export class TicketService {
  constructor(
    @Inject('TICKETS_REPOSITORY') private ticketRepository: typeof Ticket
  ) {}

  async booking(ticketBooking: TicketBooking) {
    // const transaction = await this.sequelizeInstance.transaction();
    return await this.ticketRepository.create(ticketBooking as Ticket);
  }
}
