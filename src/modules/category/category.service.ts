import { Inject, Injectable } from '@nestjs/common';
import { Category } from './category.model';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORIES_REPOSITORY')
    private readonly categoryRepository: typeof Category
  ) {}

  fetchCategory(options = {}): Promise<Category[]> {
    return this.categoryRepository.findAll(options);
  }

  createCategory(categoryDate: Category): Promise<Category> {
    return this.categoryRepository.create(categoryDate);
  }

  updateCategory(
    id: number,
    categoryDate: Category
  ): Promise<[number, Category[]]> {
    return this.categoryRepository.update(categoryDate, {
      where: {
        id
      }
    });
  }

  deleteCategory(id: number): Promise<number> {
    return this.categoryRepository.destroy({
      where: {
        id
      }
    });
  }
}
