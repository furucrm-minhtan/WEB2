import { Body, Controller, Post } from '@nestjs/common';
import { ActionResponseService } from '../actionResponse/actionresponse.service';
import { TicketBooking } from './dto/ticket.dto';
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
}
