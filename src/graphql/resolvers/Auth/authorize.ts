import { AuthenticationError } from 'apollo-server-core';
import { verify } from 'jsonwebtoken';
import { getConnection } from 'typeorm';

import { config } from '../../../config';
import { User, UserStatus } from '../../../db//entities/User';
import { generateJWTToken } from '../../../helpers/auth/generateJWTToken';
import { IToken } from '../../../types/IToken';

export async function authorize(_: any, args: any) {
  const { token } = args;

  let decoded: IToken;

  try {
    decoded = verify(
      token,
      config.auth.jwtSecret,
      {
        ignoreExpiration: true,
        maxAge: config.auth.tokenMaxAge,
        },
    ) as IToken;
  } catch (error) {

    console.error(error);
    throw new AuthenticationError('Invalid Token');
  }

  const id = decoded.id;

  const connection = getConnection();

  const userRepository = connection.getRepository(User);

  const userExists = await userRepository.findOne(id);

  if (!userExists || userExists.deletedAt) {
    throw new AuthenticationError('Invalid email or password');
  }

  if (userExists.status !== UserStatus.ACTIVE) {
    throw new AuthenticationError('Invalid user, contact admin about account status');
  }

  const newtoken = generateJWTToken(userExists);

  return {
    token: newtoken,
    user: userExists,
  };

}