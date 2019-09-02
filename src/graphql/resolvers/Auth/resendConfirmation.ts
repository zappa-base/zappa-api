import {
  ApolloError,
  ForbiddenError,
  UserInputError,
} from 'apollo-server-core';
import { getCustomRepository, getRepository, IsNull } from 'typeorm';

import { ConfirmationToken } from '../../../db/entities/ConfirmationToken';
import { UserStatus } from '../../../db/entities/User';
import { UserRepository } from '../../../db/repositories/UserRepository';
import { sendConfirmationEmail } from '../../../emails/confirmationEmail';
import { setUserConfirmationToken } from '../../../helpers/auth/setUserConfirmationToken';

export async function resendConfirmation(_: any, args: any) {
  const { email, endpoint } = args;

  const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.findByEmail(email);

  if (!user || user.deletedAt) {
    throw new UserInputError('Invalid email');
  }

  if (
    user.status === UserStatus.DELETED ||
    user.status === UserStatus.SUSPENDED
  ) {
    throw new ForbiddenError(
      'Invalid user, contact admin about account status',
    );
  }

  if (user.confirmedAt) {
    throw new UserInputError('User already confirmed');
  }

  const confirmationTokenRepository = getRepository(ConfirmationToken);

  const confirmationTokens = await confirmationTokenRepository.find({
    confirmedAt: IsNull(),
    deletedAt: IsNull(),
    invalidatedAt: IsNull(),
    user,
  });

  if (confirmationTokens && confirmationTokens.length) {
    confirmationTokens.forEach((token) => {
      token.invalidatedAt = new Date();
    });

    await confirmationTokenRepository.save(confirmationTokens);
  }

  const confirmationToken = await setUserConfirmationToken(user);

  try {
    await sendConfirmationEmail(user, confirmationToken, endpoint);
  } catch (error) {
    console.error(error);
    throw new ApolloError('Unable to send confirmation email');
  }

  return true;
}
