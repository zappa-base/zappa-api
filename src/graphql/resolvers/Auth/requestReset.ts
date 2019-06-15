import { getConnection, IsNull } from 'typeorm';
import { UserInputError, ApolloError } from 'apollo-server-core';

import { User } from '../../../db/entities/User';
import { ResetToken } from '../../../db/entities/ResetToken';
import { setUserResetToken } from '../../../helpers/auth/setRestConfirmToken';
import { sendResetEmail } from '../../../emails/resetEmail';

export async function requestReset(obj: any, args: any) {
  const { email } = args;

  const connection = getConnection();

  const userRepository = connection.getRepository(User);

  const user = await userRepository.findOne({ email });

  if (!user || user.deletedAt) {
    throw new UserInputError('Invalid email');
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