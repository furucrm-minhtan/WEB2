import { Controller, Get, Param, Query } from '@nestjs/common';
import Helper from 'src/helper/helper';
import { ActionResponseService } from '../actionResponse/actionresponse.service';
import { ShowTime } from './showtime.model';
import { ShowTimeService } from './showtime.service';

@Controller('api/showtime')
export class ShowTimeController {
  constructor(
    private readonly showTimeService: ShowTimeService,
    private readonly actionResponseService: ActionResponseService
  ) {}

  @Get(':id')
  async fetchShowTimesMovie(
    @Param('id') id: number,
    @Query('movie') movieId: number
  ) {
    try {
      const showTimesDisplay = await this.showTimeService.fetchShowTimeMovie(
        id,
        movieId,
        5
      );

      return this.actionResponseService.responseApi(true, showTimesDisplay, '');
    } catch (error) {
      console.log(error);
    }

    return this.actionResponseService.responseApi(
      false,
      '',
      'fetch data failed'
    );
  }
}
