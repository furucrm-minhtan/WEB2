import { Injectable, Inject } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Movie } from '../movie/movie.model';
import { ShowTime } from '../showTime/showtime.model';
import { TicketBooking } from './dto/ticket.dto';
import { Ticket } from './ticket.model';

@Injectable()
export class TicketService {
  constructor(
    @Inject('TICKETS_REPOSITORY') private ticketRepository: typeof Ticket
  ) {}

  async fetchTicket(options = {}): Promise<Ticket[]> {
    return this.ticketRepository.findAll(options);
  }

  booking(ticketBooking: any) {
    return this.ticketRepository.create(ticketBooking as Ticket);
  }

  async countTicketUser(userId: number): Promise<number> {
    return this.ticketRepository.count({ where: { userId } });
  }

  async getTicketMovie(
    id: number,
    offset = 0,
    limit = 10,
    sort = 'name'
  ): Promise<Ticket[]> {
    return this.ticketRepository.findAll({
      where: {
        userId: id
      },
      include: [
        { model: ShowTime, include: [{ model: Movie, order: [sort] }] }
      ],
      offset,
      limit
    });
  }
}
