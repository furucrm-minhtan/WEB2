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
import { MailService } from '../mail/mail.service';
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
    private readonly mailService: MailService,
    private readonly actionResponseService: ActionResponseService
  ) {}

  @Get('user')
  async fetchUserTicketInformation(@Session() { user }: { user: UserSession }) {
    try {
      const id: number = user?.id;
      const totalTicket: number = await this.ticketService.countTicketUser(id);

      return this.actionResponseService.responseApi(true, { totalTicket }, '');
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
        +offset,
        +limit,
        sort
      );

      return this.actionResponseService.responseApi(
        true,
        data,
        'fetch data success'
      );
    } catch (error) {
      console.log(error);
    }

    return this.actionResponseService.responseApi(
      true,
      [],
      'fetch data failed'
    );
  }

  @Post()
  async buyTicket(
    @Session() session: Record<string, any>,
    @Body()
    {
      seatId,
      show,
      movieName,
      seatPosition,
      theaterAddress,
      price
    }: Record<string, any>
  ): Promise<Record<string, any>> {
    let errorMessage = '';
    try {
      const userId: number = session?.user?.id;
      if (!userId) {
        throw new Error('you neeed authen');
      }
      const showId: number = show?.id;
      const ticket = await this.ticketService.booking({
        seatId,
        showId,
        userId
      });
      console.log(ticket);
      const user: User = await this.userService.getUser(userId);
      if (user?.phone) {
        this.smsService
          .send({
            to: user.phone,
            text: 'thank for booking ticket'
          })
          .then((response) => console.log(response))
          .catch((error) => console.log(error));
      }

      if (user?.email) {
        this.mailService.sendBookingTicketMail(user?.email, {
          movieName,
          movieStartDate: `${show.date} ${show.start}`,
          seat: seatPosition,
          theaterAddress,
          price
        });
      }

      return this.actionResponseService.responseApi(
        true,
        '',
        'booking success please check your mail and sms'
      );
    } catch (error) {
      console.log(error.message);
      errorMessage = error.message;
    }
    return this.actionResponseService.responseApi(false, '', errorMessage);
  }

  @Get(':id')
  async fetchUserTicket(
    @Session() session: Record<string, any>,
    @Param('id', ParseIntPipe) showId: number
  ) {
    let errorMessage = '';
    try {
      const userId = session?.user?.id;
      if (!userId) {
        throw new Error('You need authen');
      }
      const tickets: Ticket[] = await this.ticketService.fetchTicket({
        where: {
          userId,
          showId
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
      console.log(error.message);
      errorMessage = error.message;
    }

    return this.actionResponseService.responseApi(false, '', errorMessage);
  }
}
