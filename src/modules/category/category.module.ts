import { Module } from '@nestjs/common';
import { ActionResponseModule } from '../actionResponse/actionresponse.module';
import { CategoryController } from './category.controller';
import { CategoryProviders } from './category.provider';
import { CategoryService } from './category.service';

@Module({
  imports: [ActionResponseModule],
  controllers: [CategoryController],
  providers: [CategoryService, ...CategoryProviders],
  exports: [CategoryService]
})
export class CategoryModule {}
