import { getConnection, IsNull } from 'typeorm';
import { User } from '../../../db/entities/User';
import { UserInputError, ApolloError } from 'apollo-server-core';
import { ConfirmationToken } from '../../../db/entities/ConfirmationToken';
import { sendConfirmationEmail } from '../../../emails/confirmationEmail';
import { setUserConfirmationToken } from '../../../helpers/auth/setUserConfirmationToken';

export async function resendConfirmation(obj: any, args: any) {
  const { email } = args;

  const connection = getConnection();

  const userRepository = connection.getRepository(User);

  const user = await userRepository.findOne({ email });

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