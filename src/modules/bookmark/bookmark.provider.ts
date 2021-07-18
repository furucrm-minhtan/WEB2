import { Bookmark } from './bookmark.model';

export const BookmarkProviders = [
  {
    provide: 'BOOKMARKS_REPOSITORY',
    useValue: Bookmark
  }
];
