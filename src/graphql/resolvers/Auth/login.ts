import { getConnection } from 'typeorm';
import bcrypt from 'bcrypt';

import { AuthenticationError } from 'apollo-server-core';
import { generateJWTToken } from '../../../helpers/auth/generateJWTToken';
import { UserRepository } from '../../../db/repositories/UserRepository';

export async function login(_: any, args: any) {
  const { email, password } = args;

  const connection = getConnection();

  const userRepository = connection.getCustomRepository(UserRepository);

  const userExists = await userRepository.findByEmail(email);

  if (!userExists || userExists.deletedAt) {
    throw new AuthenticationError('Invalid email or password');
  }

  if (!userExists.confirmedAt) {
    throw new AuthenticationError('User not confirmed yet');
  }

  const validPassword = await bcrypt.compare(password, userExists.password);

  if (!validPassword) {
    throw new AuthenticationError('Invalid email or password');
  }

  const token = generateJWTToken(userExists);

  return {
    token,
    user: userExists,
  };

}