import { Body, Controller, Post } from '@nestjs/common';
import { TicketBooking } from './dto/ticket.dto';
import { TicketService } from './ticket.service';

@Controller('/ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  async buyTicket(
    @Body() ticketBooking: TicketBooking
  ): Promise<Record<string, any>> {
    const response = {};

    try {
      await this.ticketService.booking(ticketBooking);
    } catch (error) {
      console.log(error);
    }
    return response;
  }
}
