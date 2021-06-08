import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.model';
import Helper from '../../helper/helper';
import { ChangePassword, UserProfile, UserRegister } from './dto/user.dto';
import { Movie } from '../movie/movie.model';
import { MailService } from '../mail/mail.service';
import * as randomString from 'randomstring';

@Injectable()
export class UserService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
    private mailService: MailService
  ) {}

  async findAll(options = {}): Promise<User[]> {
    return this.usersRepository.findAll<User>(options);
  }

  async findOne(options = {}): Promise<User> {
    return this.usersRepository.findOne(options);
  }

  async findUser(userName: string, options = {}): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        user_name: userName
      },
      ...options
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

  async sendMailForgotPassword(
    hostname: string,
    session: Record<string, any>,
    email: string
  ) {
    const token = randomString.generate(20);
    const user: User = await this.usersRepository.findOne({
      where: { email }
    });

    if (!user) throw 'email not exist';
    await this.mailService.sendResetEmail(
      `${hostname}/reset-password?token=${token}`,
      { email }
    );
    session.resetPassword = { email, token };
  }

  async createNewUser(
    hostname: string,
    { user_name, email, name, password }: UserRegister
  ): Promise<void> {
    const token = randomString.generate(20);
    password = Helper.hashPassword(password);
    const user: User = await this.usersRepository.create({
      user_name,
      email,
      name,
      password,
      verify_code: token
    } as User);

    if (user) {
      await this.mailService.sendUserVerifyRegistration(
        `${hostname}/authen/verify-register?token=${token}`,
        user
      );
    }
  }

  async verifyRegister(verify_code: string): Promise<void> {
    const user: User = await this.usersRepository.findOne({
      where: {
        verify_code
      }
    });

    if (!user) throw 'token is invalid';
    user.verify_code = '';
    user.save();
  }

  async resetPassword(
    email: string,
    password: string
  ): Promise<[number, User[]]> {
    const hashPassword = Helper.hashPassword(password);

    return await this.usersRepository.update(
      { password: hashPassword },
      {
        where: {
          email
        }
      }
    );
  }

  async uploadAvatar(id: number, avatar: string) {
    return this.usersRepository.update(
      { avatar },
      {
        where: {
          id
        }
      }
    );
  }
}
