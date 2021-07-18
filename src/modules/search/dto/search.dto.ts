interface SearchParams {
  name?: string;
  cateId?: number;
  releaseDate?: string;
  group?: string;
  theater?: string;
  showTimeFrom?: ShowTimeParams;
  paginate?: Paginate;
  order?: Sort;
  rating?: string;
}

interface ShowTimeParams {
  date: string;
  time: string;
}
