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
import { GroupTheater } from './groupTheater.model';
import { GroupTheaterService } from './grouptheater.service';
import { GroupTheaterOptions, UpdateGroup } from './dto/groupTheater.dto';
import { ActionResponseService } from '../actionResponse/actionresponse.service';
import { ValidationError } from 'sequelize';

@Controller('groupthearter')
export class GroupthearterController {
  constructor(
    private groupthearterService: GroupTheaterService,
    private actionResponseService: ActionResponseService
  ) {}

  @Get()
  async fetchGroup() {
    try {
      const groups: GroupTheater[] = await this.groupthearterService.findAll({
        attributes: ['id', 'name', 'address', 'creationDate', 'updatedOn']
      });

      return this.actionResponseService.responseApi(
        true,
        groups,
        'fetch data success'
      );
    } catch (error) {
      console.log(error);
    }

    return this.actionResponseService.responseApi(
      false,
      '',
      'fetch data falied'
    );
  }

  @Post()
  async create(@Body() data: GroupTheaterOptions) {
    let errorMessage = '';
    try {
      const group: GroupTheater = await this.groupthearterService.createGroupTheater(
        (data as unknown) as GroupTheater
      );

      return this.actionResponseService.responseApi(
        true,
        group,
        'create success'
      );
    } catch (error) {
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
    @Body() data: UpdateGroup
  ): Promise<ActionResponseService> {
    let errorMessage = '';
    try {
      const [, group] = await this.groupthearterService.updateGroupTheater(
        id,
        (data as unknown) as GroupTheater
      );

      return this.actionResponseService.responseApi(
        true,
        group,
        'update success'
      );
    } catch (error) {
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
      const deleted: number = await this.groupthearterService.deleteGroupTheater(
        id
      );

      return this.actionResponseService.responseApi(
        true,
        deleted,
        'delete success'
      );
    } catch (error) {
      console.log(error);
    }

    return this.actionResponseService.responseApi(false, '', 'delete falied');
  }
}
