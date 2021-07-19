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

  createGroupTheater(groupThearterNew: GroupTheater) {
    return this.groupTheaterRepository.create(groupThearterNew);
  }

  updateGroupTheater(
    id: number,
    groupData: GroupTheater
  ): Promise<[number, GroupTheater[]]> {
    return this.groupTheaterRepository.update(groupData, {
      where: {
        id
      },
      returning: true
    });
  }

  deleteGroupTheater(id: number): Promise<number> {
    return this.groupTheaterRepository.destroy({
      where: {
        id
      }
    });
  }
}
