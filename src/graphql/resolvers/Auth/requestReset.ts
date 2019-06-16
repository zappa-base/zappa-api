import { ApolloError, AuthenticationError, UserInputError } from 'apollo-server-core';
import { getConnection, IsNull } from 'typeorm';

import { ResetToken } from '../../../db/entities/ResetToken';
import { UserStatus } from '../../../db/entities/User';
import { UserRepository } from '../../../db/repositories/UserRepository';
import { sendResetEmail } from '../../../emails/resetEmail';
import { setUserResetToken } from '../../../helpers/auth/setRestConfirmToken';

export async function requestReset(obj: any, args: any) {
  const { email } = args;

  const connection = getConnection();

  const userRepository = connection.getCustomRepository(UserRepository);

  const user = await userRepository.findByEmail(email);

  if (!user || user.deletedAt) {
    throw new UserInputError('Invalid email');
  }

  if (user.status !== UserStatus.ACTIVE) {
    throw new AuthenticationError('Invalid user, contact admin about account status');
  }

  if (!user.confirmedAt) {
    throw new UserInputError('Invalid user not confirmed');
  }

  const resetTokenRepository = connection.getRepository(ResetToken);

  const resetTokens = await resetTokenRepository.find({
    user,
    resetAt: IsNull(),
    invalidatedAt: IsNull(),
    deletedAt: IsNull(),
   });

  if (resetTokens && resetTokens.length) {
    resetTokens.forEach(token => {
      token.invalidatedAt = new Date();
    });

    await resetTokenRepository.save(resetTokens);
  }

  const resetToken = await setUserResetToken(connection, user);

  try {
    await sendResetEmail(user, resetToken);
  } catch (error) {
    console.error(error);
    throw new ApolloError('Unable to send confirmation email');
  }

  return true;
}