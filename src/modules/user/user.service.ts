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
    private usersRepository: typeof User
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

  async loadProfileView(id): Promise<UserProfile> {
    const user: User = await this.getUser(id);

    return user.get({ plain: true });
  }

  async getFavoriteMovie(id: number, offset = 0, limit = 10): Promise<Movie[]> {
    const user: User = await this.usersRepository.findOne({
      where: {
        id
      },
      include: [
        {
          attributes: {
            exclude: ['creationDate', 'updatedOn', 'trailer']
          },
          model: Movie,
          as: 'moviesFavorite',
          limit
        }
      ]
    });

    return user.moviesFavorite;
  }

  async updateProfile(user: User): Promise<[number, User[]]> {
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
    { oldPassword, newPassword }: ChangePassword
  ): Promise<[number, User[]]> {
    const user: User = await this.getUser(id);

    if (!Helper.comparePassword(oldPassword, user.password)) {
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
