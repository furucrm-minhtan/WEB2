import { Inject, Injectable } from '@nestjs/common';
import { Theater } from './theater.model';

@Injectable()
export class TheaterService {
  @Inject('THEATERS_REPOSITORY') private theaterRepository: typeof Theater;

  async findAll(options = {}) {
    return this.theaterRepository.findAll(options);
  }
}
