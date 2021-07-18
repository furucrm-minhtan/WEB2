import { Category } from './category.model';

export const CategoryProviders = [
  {
    provide: 'CATEGORIES_REPOSITORY',
    useValue: Category
  }
];
