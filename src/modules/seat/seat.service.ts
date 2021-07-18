import { Inject, Injectable } from '@nestjs/common';
import { SeatsRoomParam } from './dto/seat.dto';
import { Seat } from './seat.model';

@Injectable()
export class SeatService {
  constructor(
    @Inject('SEATS_REPOSITORY') private seatRepository: typeof Seat
  ) {}

  createSeatsForRoom({ id, row, col }: SeatsRoomParam, options = {}) {
    const seats: Seat[] = this.generateMatrixSeats(id, row, col);
    return this.seatRepository.bulkCreate(seats, options);
  }

  delete(options: Record<string, any>) {
    return this.seatRepository.destroy(options);
  }

  private generateMatrixSeats(roomId: number, row: number, column: number) {
    const seats: Seat[] = [];
    for (let i = 1; i <= row; i++) {
      for (let j = 1; j <= column; j++) {
        seats.push({ roomId, row: i, column: j } as Seat);
      }
    }
    return seats;
  }
}
