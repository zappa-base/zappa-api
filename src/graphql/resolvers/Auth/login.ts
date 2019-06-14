import { getConnection } from 'typeorm';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

import { User } from '../../../db//entities/User';
import { AuthenticationError } from 'apollo-server-core';
import { generateTolken } from '../../../helpers/auth/generateToken';

export async function login(_: any, args: any) {
  const { email, password } = args;

  const connection = getConnection();

  const userRepository = connection.getRepository(User);

  const userExists = await userRepository.findOne({
    email,
  });

  if (!userExists) {
    throw new AuthenticationError('Invalid email or password');
  }

  const validPassword = await bcrypt.compare(password, userExists.password);

  if (!validPassword) {
    throw new AuthenticationError('Invalid email or password');
  }

  const token = generateTolken(userExists);

  return {
    token,
    user: userExists,
  };

}