import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ActionResponseService } from '../actionResponse/actionresponse.service';
import { StatisticalService } from './statistical.service';

@Controller('statistical')
export class StatisticalController {
  constructor(
    private readonly statisticalService: StatisticalService,
    private readonly actionResponseService: ActionResponseService
  ) {}

  @Get('user/:year')
  async statisticalRegisteredUsers(@Param('year') year: string) {
    let message = '';

    try {
      const userStatistical: Record<
        string,
        any
      > = await this.statisticalService.userQuantity(year);

      return this.actionResponseService.responseApi(true, userStatistical, '');
    } catch (error) {
      message = error;
      console.log(error);
    }

    return this.actionResponseService.responseApi(false, '', message);
  }

  @Get('movie')
  async statisticalMovie(
    @Query('start') start: string,
    @Query('end') end: string
  ) {
    let message = '';

    try {
      const movieStatistical: Record<
        string,
        any
      > = await this.statisticalService.annualMovie(5, start, end);

      return this.actionResponseService.responseApi(true, movieStatistical, '');
    } catch (error) {
      message = error;
      console.log(error);
    }

    return this.actionResponseService.responseApi(false, '', message);
  }

  @Get('group')
  async statisticalGroup(
    @Query('start') start: string,
    @Query('end') end: string
  ) {
    let message = '';

    try {
      const groupStatistical: Record<
        string,
        any
      > = await this.statisticalService.annualGroup(5, start, end);

      return this.actionResponseService.responseApi(true, groupStatistical, '');
    } catch (error) {
      message = error;
      console.log(error);
    }

    return this.actionResponseService.responseApi(false, '', message);
  }
}
