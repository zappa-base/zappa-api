import { AuthenticationError, UserInputError } from 'apollo-server-core';
import { getConnection } from 'typeorm';
import hashjs from 'hash.js';

import { generateJWTToken } from '../../../helpers/auth/generateJWTToken';
import { ConfirmationToken } from '../../../db/entities/ConfirmationToken';
import { User, UserStatus } from '../../../db/entities/User';

export async function confirmUser(_: any, args: any) {
  const { token } = args;

  const connection = getConnection();

  const confirmationTokenRepository = connection.getRepository(ConfirmationToken);

  const confirmationToken = await confirmationTokenRepository
    .findOne(
      { token: hashjs.sha256().update(token).digest('hex')},
      {relations: ['user'] },
    );

  if (!confirmationToken || confirmationToken.invalidatedAt || confirmationToken.deletedAt) {
    throw new AuthenticationError('Invalid confirmation token');
  }

  if (confirmationToken.confirmedAt) {
    throw new UserInputError('Confimation token already used');
  }

  if (!confirmationToken.user) {
    throw new AuthenticationError('Invalid confirmation token');
  }

  if (confirmationToken.user.confirmedAt) {
    throw new UserInputError('User already confirmed');
  }

  const userRepository = connection.getRepository(User);

  confirmationToken.user.confirmedAt = new Date();
  confirmationToken.user.status = UserStatus.ACTIVE;
  confirmationToken.confirmedAt = new Date();

  await userRepository.save(confirmationToken.user);
  await confirmationTokenRepository.save(confirmationToken);

  const newtoken = generateJWTToken(confirmationToken.user);

  return {
    token: newtoken,
    user: confirmationToken.user,
  };

}