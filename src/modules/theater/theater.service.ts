import { Inject, Injectable } from '@nestjs/common';
import { CreateTheater } from './dto/theater.dto';
import { Theater } from './theater.model';

@Injectable()
export class TheaterService {
  @Inject('THEATERS_REPOSITORY') private theaterRepository: typeof Theater;

  async findAll(options = {}) {
    return this.theaterRepository.findAll(options);
  }

  createTheater(data: Theater) {
    return this.theaterRepository.create(data);
  }

  updateTheater(id: number, data: Theater): Promise<[number, Theater[]]> {
    return this.theaterRepository.update(data, {
      where: {
        id
      },
      returning: true
    });
  }

  deleteTheater(id: number): Promise<number> {
    return this.theaterRepository.destroy({
      where: {
        id
      }
    });
  }
}
