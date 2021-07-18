import { Inject, Injectable } from '@nestjs/common';
import { TheaterMovie } from './theaterMovie.model';

@Injectable()
export class TheaterMovieService {
  constructor(
    @Inject('THEATERMOVIE_RESPOSITORY')
    private theaterMovieRepository: typeof TheaterMovie
  ) {}

  createAssociationsTheater(
    movieId: number,
    theaterIds: number[],
    options = {}
  ) {
    const theaterMovie: TheaterMovie[] = this.createTheaterMovieList(
      movieId,
      theaterIds
    );

    return this.theaterMovieRepository.bulkCreate(theaterMovie, options);
  }

  delete(options: Record<string, any>) {
    return this.theaterMovieRepository.destroy(options);
  }

  private createTheaterMovieList(
    movieId: number,
    theaterIds: number[]
  ): TheaterMovie[] {
    return theaterIds.reduce((result, id): any[] => {
      result.push({ movieId, theaterId: id });
      return result;
    }, []);
  }
}
