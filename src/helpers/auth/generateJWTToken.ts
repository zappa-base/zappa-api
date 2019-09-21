import { ForbiddenError } from 'apollo-server-core';
import jsonwebtoken from 'jsonwebtoken';
import moment from 'moment';

import { config } from '../../config';
import { User } from '../../db/entities/User';

import { jwtSessionGenerator } from './jwtSessionGenerator';

export async function generateJWTToken(user: User, pid?: string) {
  const session = await jwtSessionGenerator(user, pid);

  if (!session) {
    throw new ForbiddenError('Invalid Session State');
  }

  return jsonwebtoken.sign(
    {
      email: user.email,
      exp: moment()
        .add(15, 'minutes')
        .unix(),
      iat: moment().unix(),
      id: String(user.id),
      nickname: user.nickname,
      pid: session.id,
      role: user.role,
    },
    config.auth.jwtSecret,
  );
}
