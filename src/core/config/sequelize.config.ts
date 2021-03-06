import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  SequelizeModuleAsyncOptions,
  SequelizeModuleOptions
} from '@nestjs/sequelize';
import { GroupedObservable } from 'rxjs';
import { Bookmark } from 'src/modules/bookmark/bookmark.model';
import { Category } from 'src/modules/category/category.model';
import { Review } from 'src/modules/review/review.model';
import { GroupTheater } from 'src/modules/groupTheater/groupTheater.model';
import { Movie } from 'src/modules/movie/movie.model';
import { Room } from 'src/modules/room/room.model';
import { Seat } from 'src/modules/seat/seat.model';
import { ShowTime } from 'src/modules/showTime/showtime.model';
import { Theater } from 'src/modules/theater/theater.model';
import { Ticket } from 'src/modules/ticket/ticket.model';
import { User } from 'src/modules/user/user.model';
import { Op } from 'sequelize';
import { TheaterMovie } from 'src/modules/theaterMovie/theaterMovie.model';

export const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col
};

const CommonBasicSequelize = (
  configService: ConfigService
): SequelizeModuleOptions => ({
  dialect: configService.get('DB_DRIVER') || 'mysql',
  host: configService.get('DB_HOST') || 'localhost',
  port: configService.get('DB_PORT') || 3306,
  username: configService.get('DB_USERNAME') || 'root',
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME') || 'local',
  autoLoadModels: true,
  synchronize: true,
  models: [
    User,
    Ticket,
    Theater,
    ShowTime,
    Seat,
    Room,
    Movie,
    GroupTheater,
    Review,
    Category,
    Bookmark,
    TheaterMovie
  ],
  operatorsAliases
});

const localSequelize = (configService: ConfigService): SequelizeModuleOptions =>
  CommonBasicSequelize(configService);

const productionSequelize = (
  configService: ConfigService
): SequelizeModuleOptions => {
  return {
    ...CommonBasicSequelize(configService),
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
        require: true
      }
    }
  };
};

export default class SequelizeConfig {
  static getSequelizeConfig(
    configService: ConfigService
  ): SequelizeModuleOptions {
    return configService.get('ENVIRONMENT') === 'local'
      ? localSequelize(configService)
      : productionSequelize(configService);
  }
}

export const sequelizeConfigAsync: SequelizeModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService
  ): Promise<SequelizeModuleOptions> =>
    SequelizeConfig.getSequelizeConfig(configService),
  inject: [ConfigService]
};
