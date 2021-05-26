import * as bcrypt from 'bcrypt';
import constraints from 'src/core/config/constraints';

const { SALT } = constraints;

export default class Helper {
  static hashPassword(password: string, salt = SALT): string {
    return bcrypt.hashSync(password, salt);
  }

  static comparePassword(password: string, hashPassword: string): boolean {
    return bcrypt.compare(password, hashPassword);
  }

  static sortLiteralObject(unordered: any) {
    return Object.keys(unordered)
      .sort()
      .reduce((obj, key) => {
        obj[key] = unordered[key];
        return obj;
      }, {});
  }
}
