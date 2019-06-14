import jsonwebtoken from 'jsonwebtoken';

import { User } from '../../db/entities/User';
import { config } from '../../config';

export function generateTolken(user: User) {
  return jsonwebtoken.sign({
    email: user.email,
    exp: (Date.now() / 1000) + (15 * 60),
    iat: Date.now() / 1000,
    id: String(user.id),
    nickname: user.nickname,
    role: user.role,
  }, config.auth.jwtSecret);
}