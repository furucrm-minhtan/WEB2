import { Injectable, Inject } from '@nestjs/common';
import { GroupTheater } from './groupTheater.model';

@Injectable()
export class GroupTheaterService {
  constructor(
    @Inject('GROUPTHEATERS_REPOSITORY')
    private groupTheaterRepository: typeof GroupTheater
  ) {}

  async findAll(options = {}) {
    return this.groupTheaterRepository.findAll(options);
  }
}
