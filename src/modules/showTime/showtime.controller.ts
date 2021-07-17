import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query
} from '@nestjs/common';
import { ActionResponseService } from '../actionResponse/actionresponse.service';
import { GenerateShowTime, UpdateShowTime } from './dto/showtime.dto';
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

  @Post()
  async create(@Body() data: GenerateShowTime) {
    let errorMessage = '';
    try {
      const showTime: ShowTime = await this.showTimeService.create(
        data as ShowTime
      );

      return this.actionResponseService.responseApi(true, showTime, '');
    } catch (error) {
      errorMessage = 'create failed';
      console.log(error);
    }
    return this.actionResponseService.responseApi(false, '', errorMessage);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateShowTime
  ) {
    let errorMessage = '';
    try {
      const showTime: [number, ShowTime[]] = await this.showTimeService.update(
        id,
        data as ShowTime
      );

      return this.actionResponseService.responseApi(true, showTime, '');
    } catch (error) {
      errorMessage = 'update failed';
      console.log(error);
    }
    return this.actionResponseService.responseApi(false, '', errorMessage);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      const deleted: number = await this.showTimeService.delete({
        where: { id }
      });

      return this.actionResponseService.responseApi(true, deleted, '');
    } catch (error) {
      console.log(error);
    }
    return this.actionResponseService.responseApi(false, '', '');
  }
}
