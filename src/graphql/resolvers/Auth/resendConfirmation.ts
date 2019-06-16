import { ApolloError, UserInputError } from 'apollo-server-core';
import { getConnection, IsNull } from 'typeorm';

import { ConfirmationToken } from '../../../db/entities/ConfirmationToken';
import { UserRepository } from '../../../db/repositories/UserRepository';
import { sendConfirmationEmail } from '../../../emails/confirmationEmail';
import { setUserConfirmationToken } from '../../../helpers/auth/setUserConfirmationToken';

export async function resendConfirmation(obj: any, args: any) {
  const { email } = args;

  const connection = getConnection();

  const userRepository = connection.getCustomRepository(UserRepository);

  const user = await userRepository.findByEmail(email);

  if (!user || user.deletedAt) {
    throw new UserInputError('Invalid email');
  }

  if (user.confirmedAt) {
    throw new UserInputError('User already confirmed');
  }

  const confirmationTokenRepository = connection.getRepository(ConfirmationToken);

  const confirmationTokens = await confirmationTokenRepository.find({
    user,
    confirmedAt: IsNull(),
    invalidatedAt: IsNull(),
    deletedAt: IsNull(),
   });

  if (confirmationTokens && confirmationTokens.length) {
    confirmationTokens.forEach(token => {
      token.invalidatedAt = new Date();
    });

    await confirmationTokenRepository.save(confirmationTokens);
  }

  const confirmationToken = await setUserConfirmationToken(connection, user);

  try {
    await sendConfirmationEmail(user, confirmationToken);
  } catch (error) {
    console.error(error);
    throw new ApolloError('Unable to send confirmation email');
  }

  return true;
}