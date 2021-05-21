import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.model';
import Helper from '../../helper/helper';
import { where } from 'sequelize';
import { ChangePassword, UserProfile } from './dto/user.dto';
import { Movie } from '../movie/movie.model';

@Injectable()
export class UserService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
    @Inject('MOVIES_REPOSITORY')
    private moviesRepository: typeof Movie
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll<User>();
  }

  async findUser(userName: string): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        user_name: userName
      }
    });
  }

  async loadProfileView(session: Record<string, any>): Promise<UserProfile> {
    // console.log(session);
    // const { id }: UserProfile = session.user;
    const user: User = await this.getUser(1);

    return user.get({ plain: true });
  }

  async getFavoriteMovie(id: number): Promise<Movie[]> {
    const user: User = await this.usersRepository.findOne({
      where: {
        id
      },
      include: [this.moviesRepository]
    });

    return user.moviesFavorite;
  }

  async updateProfile(user: User): Promise<[number, User[]]> {
    user.password = Helper.hashPassword(user.password);

    return this.usersRepository.update(user, {
      where: {
        id: user.id
      }
    });
  }

  async getUser(id: number): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        id: id
      }
    });
  }

  async updatePassword(
    id: number,
    { password, newPassword }: ChangePassword
  ): Promise<[number, User[]]> {
    const user: User = await this.getUser(id);

    if (!Helper.comparePassword(password, user.password)) {
      throw 'password not match';
    }
    newPassword = Helper.hashPassword(newPassword);

    return this.usersRepository.update(
      { password: newPassword },
      {
        where: { id }
      }
    );
  }
}
