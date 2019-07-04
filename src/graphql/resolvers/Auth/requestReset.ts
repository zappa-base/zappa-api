import {
  ApolloError,
  ForbiddenError,
  UserInputError,
} from 'apollo-server-core';
import { getConnection, IsNull } from 'typeorm';

import { ErrorCodes } from '../../../constants/ErrorCodes';
import { ResetToken } from '../../../db/entities/ResetToken';
import { UserStatus } from '../../../db/entities/User';
import { UserRepository } from '../../../db/repositories/UserRepository';
import { sendResetEmail } from '../../../emails/resetEmail';
import { setUserResetToken } from '../../../helpers/auth/setRestConfirmToken';

export async function requestReset(_obj: any, args: any) {
  const { email, endpoint } = args;

  const connection = getConnection();

  const userRepository = connection.getCustomRepository(UserRepository);

  const user = await userRepository.findByEmail(email);

  if (!user || user.deletedAt) {
    throw new UserInputError('Invalid email');
  }

  if (!user.confirmedAt) {
    throw new ApolloError('Invalid user not confirmed', ErrorCodes.UNCONFIRMED);
  }

  if (user.status !== UserStatus.ACTIVE) {
    throw new ForbiddenError(
      'Invalid user, contact admin about account status',
    );
  }

  const resetTokenRepository = connection.getRepository(ResetToken);

  const resetTokens = await resetTokenRepository.find({
    deletedAt: IsNull(),
    invalidatedAt: IsNull(),
    resetAt: IsNull(),
    user,
  });

  if (resetTokens && resetTokens.length) {
    resetTokens.forEach((token) => {
      token.invalidatedAt = new Date();
    });

    await resetTokenRepository.save(resetTokens);
  }

  const resetToken = await setUserResetToken(connection, user);

  try {
    await sendResetEmail(user, resetToken, endpoint);
  } catch (error) {
    console.error(error);
    throw new ApolloError('Unable to send confirmation email');
  }

  return true;
}
