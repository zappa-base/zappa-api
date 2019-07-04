import { ForbiddenError, UserInputError } from 'apollo-server-core';
import { getConnection } from 'typeorm';

import { ConfirmationToken } from '../../../db/entities/ConfirmationToken';
import { User, UserStatus } from '../../../db/entities/User';
import { generateJWTToken } from '../../../helpers/auth/generateJWTToken';
import { hashToken } from '../../../helpers/auth/hashToken';

export async function confirmUser(_: any, args: any) {
  const { token } = args;

  const connection = getConnection();

  const confirmationTokenRepository = connection.getRepository(
    ConfirmationToken,
  );

  const confirmationToken = await confirmationTokenRepository.findOne(
    {
      token: hashToken(token),
    },
    { relations: ['user'] },
  );

  if (
    !confirmationToken ||
    confirmationToken.invalidatedAt ||
    confirmationToken.deletedAt
  ) {
    throw new ForbiddenError('Invalid confirmation token');
  }

  if (confirmationToken.confirmedAt) {
    throw new UserInputError('Confimation token already used');
  }

  if (!confirmationToken.user) {
    throw new ForbiddenError('Invalid confirmation token');
  }

  if (
    confirmationToken.user.status === UserStatus.SUSPENDED ||
    confirmationToken.user.status === UserStatus.DELETED
  ) {
    throw new ForbiddenError(
      'Invalid user, contact admin about account status',
    );
  }

  if (confirmationToken.user.deletedAt) {
    throw new ForbiddenError('Invalid user');
  }

  if (confirmationToken.user.confirmedAt) {
    throw new ForbiddenError('User already confirmed');
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
