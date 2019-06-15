import jsonwebtoken from 'jsonwebtoken';
import moment from 'moment';

import { User } from '../../db/entities/User';
import { config } from '../../config';

export function generateJWTToken(user: User) {
  return jsonwebtoken.sign({
    email: user.email,
    exp: moment().add(15, 'minutes').unix(),
    iat: moment().unix(),
    id: String(user.id),
    nickname: user.nickname,
    role: user.role,
  }, config.auth.jwtSecret);
}