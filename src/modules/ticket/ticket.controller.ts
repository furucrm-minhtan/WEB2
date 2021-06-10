import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Session
} from '@nestjs/common';
import { ActionResponseService } from '../actionResponse/actionresponse.service';
import { PagingDTO } from '../app.dto';
import { UserSession } from '../authen/dto/authen.dto';
import { Movie } from '../movie/movie.model';
import { ShowTime } from '../showTime/showtime.model';
import { SmsService } from '../sms/sms.service';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { TicketBooking } from './dto/ticket.dto';
import { Ticket } from './ticket.model';
import { TicketService } from './ticket.service';

@Controller('/ticket')
export class TicketController {
  constructor(
    private readonly ticketService: TicketService,
    private readonly userService: UserService,
    private readonly smsService: SmsService,
    private readonly actionResponseService: ActionResponseService
  ) {}

  @Get('user')
  async fetchUserTicketInformation(@Session() { user }: { user: UserSession }) {
    try {
      const id: number = user?.id;
      const totalTocket: number = await this.ticketService.countTicketUser(id);

      return this.actionResponseService.responseApi(true, { totalTocket }, '');
    } catch (error) {
      console.log(error);
    }

    return this.actionResponseService.responseApi(false, '', 'error');
  }

  @Get('user/fetch')
  async fetchTicketUser(
    @Session() { user }: { user: UserSession },
    @Query()
    { offset, limit, sort }: PagingDTO
  ): Promise<ActionResponseService> {
    try {
      const id: number = user?.id;
      const data: Ticket[] = await this.ticketService.getTicketMovie(
        id,
        offset,
        limit,
        sort
      );

      return this.actionResponseService.responseApi(true, data, '');
    } catch (error) {
      console.log(error);
    }

    return this.actionResponseService.responseApi(true, [], 'error');
  }

  @Post()
  async buyTicket(
    @Body() { seatId, showId, userId }: TicketBooking
  ): Promise<Record<string, any>> {
    try {
      await this.ticketService.booking({ seatId, showId, userId });
      const user: User = await this.userService.getUser(userId);
      if (user?.phone)
        this.smsService.send({
          to: user.phone,
          text: 'thank for booking ticket'
        });

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
