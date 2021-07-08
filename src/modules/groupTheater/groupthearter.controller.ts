import { Body, Controller, Post } from '@nestjs/common';
import { GroupTheater } from './groupTheater.model'
import { GroupTheaterService } from './grouptheater.service';
import { GroupTheaterOptions } from './dto/groupTheater.dto'
import { ActionResponseService } from '../actionResponse/actionresponse.service';

@Controller('groupthearter')
export class GroupthearterController {
    constructor(
        private groupthearterService: GroupTheaterService,
        private actionResponseService: ActionResponseService
    ){}

    @Post()
    async create(@Body() data:GroupTheaterOptions){
        try {
            const cate: GroupTheater = await this.groupthearterService.createGroupTheater(
                (data as unknown) as GroupTheater
            );

            return this.actionResponseService.responseApi(true, cate, '');

        } catch (error){
            console.log(error);
        }
        return this.actionResponseService.responseApi(false, '', '');
    }
}
