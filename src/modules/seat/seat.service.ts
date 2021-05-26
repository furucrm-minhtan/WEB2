import { Inject, Injectable } from '@nestjs/common';
import { Seat } from './seat.model';

@Injectable()
export class SeatService {
  constructor(
    @Inject('SEATS_REPOSITORY') private seatRepository: typeof Seat
  ) {}
}
