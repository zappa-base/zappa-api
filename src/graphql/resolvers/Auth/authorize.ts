import { getConnection } from 'typeorm';
import { verify } from 'jsonwebtoken';

import { User } from '../../../db//entities/User';
import { AuthenticationError } from 'apollo-server-core';
import { generateTolken } from '../../../helpers/auth/generateToken';
import { config } from '../../../config';
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

  if (!userExists) {
    throw new AuthenticationError('Invalid email or password');
  }

  const newtoken = generateTolken(userExists);

  return {
    token: newtoken,
    user: userExists,
  };

}