import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ActionResponseService } from '../actionResponse/actionresponse.service';
import { Movie } from '../movie/movie.model';
import { ShowTime } from '../showTime/showtime.model';
import { TicketBooking } from './dto/ticket.dto';
import { Ticket } from './ticket.model';
import { TicketService } from './ticket.service';

@Controller('/api/ticket')
export class TicketController {
  constructor(
    private readonly ticketService: TicketService,
    private readonly actionResponseService: ActionResponseService
  ) {}

  @Post()
  async buyTicket(
    @Body() { seatId, showId, userId }: TicketBooking
  ): Promise<Record<string, any>> {
    const response = {};

    try {
      console.log(seatId, showId, userId);
      await this.ticketService.booking({ seatId, showId, userId });

      return this.actionResponseService.responseApi(true, '', '');
    } catch (error) {
      console.log(error);
    }

    return this.actionResponseService.responseApi(true, 'booking falied', '');
  }

  @Get(':id')
  async fetchUserTicket(@Param('id') userId: number) {
    try {
      const tickets: Ticket[] = await this.ticketService.fetchTicket({
        where: {
          userId
        },
        include: [
          {
            model: ShowTime,
            order: ['start', 'end', 'date'],
            include: [{ model: Movie }]
          }
        ]
      });

      return this.actionResponseService.responseApi(true, tickets, '');
    } catch (error) {
      console.log(error);
    }

    return this.actionResponseService.responseApi(false, '', '');
  }
}
