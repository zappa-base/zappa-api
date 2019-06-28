import { UserInputError } from 'apollo-server-core';
import bcrypt from 'bcrypt';
import { getConnection } from 'typeorm';

import { UserStatus } from '../../../db/entities/User';
import { UserRepository } from '../../../db/repositories/UserRepository';
import { generateJWTToken } from '../../../helpers/auth/generateJWTToken';

export async function login(_: any, args: any) {
  const { email, password } = args;

  const connection = getConnection();

  const userRepository = connection.getCustomRepository(UserRepository);

  const userExists = await userRepository.findByEmail(email);

  if (!userExists || userExists.deletedAt) {
    throw new UserInputError('Invalid email or password');
  }

  if (!userExists.confirmedAt) {
    throw new UserInputError('User not confirmed yet');
  }

  if (userExists.status !== UserStatus.ACTIVE) {
    throw new UserInputError(
      'Invalid user, contact admin about account status',
    );
  }

  const validPassword = await bcrypt.compare(password, userExists.password);

  if (!validPassword) {
    throw new UserInputError('Invalid email or password');
  }

  const token = generateJWTToken(userExists);

  return {
    token,
    user: userExists,
  };
}
