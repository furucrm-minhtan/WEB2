import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put
} from '@nestjs/common';
import { ValidationError } from 'sequelize';
import { ActionResponseService } from '../actionResponse/actionresponse.service';
import { CreateTheater, UpdateTheater } from './dto/theater.dto';
import { Theater } from './theater.model';
import { TheaterService } from './theater.service';

@Controller('theater')
export class TheaterController {
  constructor(
    private theaterService: TheaterService,
    private actionResponseService: ActionResponseService
  ) {}

  @Get()
  async fetchTheater(): Promise<ActionResponseService> {
    try {
      const theater: Theater[] = await this.theaterService.findAll({
        attributes: [
          'id',
          'name',
          'type',
          'groupId',
          'creationDate',
          'updatedOn'
        ]
      });

      return this.actionResponseService.responseApi(
        true,
        theater,
        'fetch data success'
      );
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
  async create(@Body() data: CreateTheater): Promise<ActionResponseService> {
    let errorMessage = '';
    try {
      const theater: Theater = await this.theaterService.createTheater(
        (data as unknown) as Theater
      );
      return this.actionResponseService.responseApi(
        true,
        theater,
        'create success'
      );
    } catch (error) {
      errorMessage = 'create failed';
      if (error instanceof ValidationError) {
        errorMessage = error.errors[0].message;
      }
      console.log(error.message);
    }

    return this.actionResponseService.responseApi(false, '', errorMessage);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateTheater
  ): Promise<ActionResponseService> {
    let errorMessage = '';
    try {
      const [, theater] = await this.theaterService.updateTheater(
        id,
        (data as unknown) as Theater
      );

      return this.actionResponseService.responseApi(
        true,
        theater[0],
        'update success'
      );
    } catch (error) {
      errorMessage = 'update failed';
      if (error instanceof ValidationError) {
        errorMessage = error.errors[0].message;
      }
      console.log(error.message);
    }

    return this.actionResponseService.responseApi(false, '', errorMessage);
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ActionResponseService> {
    try {
      const deleted: number = await this.theaterService.deleteTheater(id);

      return this.actionResponseService.responseApi(
        true,
        deleted,
        'delete success'
      );
    } catch (error) {
      console.log(error);
    }

    return this.actionResponseService.responseApi(false, '', 'delete failed');
  }
}
