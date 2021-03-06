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
import { ActionResponseService } from '../actionResponse/actionresponse.service';
import { Category } from './category.model';
import { CategoryService } from './category.service';
import { AddCategory, UpdateCategory } from './dto/category.dto';

@Controller('category')
export class CategoryController {
  constructor(
    private categoryService: CategoryService,
    private actionResponseService: ActionResponseService
  ) {}

  @Get()
  async fetchCategory(): Promise<ActionResponseService> {
    try {
      const categories: Category[] = await this.categoryService.fetchCategory({
        attributes: ['id', 'name', 'level', 'creationDate', 'updatedOn']
      });

      return this.actionResponseService.responseApi(
        true,
        categories,
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
  async create(@Body() data: AddCategory): Promise<ActionResponseService> {
    try {
      const cate: Category = await this.categoryService.createCategory(
        (data as unknown) as Category
      );

      return this.actionResponseService.responseApi(
        true,
        cate,
        'create success'
      );
    } catch (error) {
      console.log(error);
    }

    return this.actionResponseService.responseApi(false, '', 'create failed');
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateCategory
  ): Promise<ActionResponseService> {
    try {
      const [, cate] = await this.categoryService.updateCategory(
        id,
        (data as unknown) as Category
      );

      return this.actionResponseService.responseApi(
        true,
        cate[0],
        'update success'
      );
    } catch (error) {
      console.log(error);
    }

    return this.actionResponseService.responseApi(false, '', 'update failed');
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ActionResponseService> {
    try {
      const deleted: number = await this.categoryService.deleteCategory(id);

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
