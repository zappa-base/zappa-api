import { AuthenticationError } from 'apollo-server-core';
import bcrypt from 'bcrypt';
import hashjs from 'hash.js';
import { getConnection } from 'typeorm';

import { config } from '../../../config';
import { ResetToken } from '../../../db/entities/ResetToken';
import { User, UserStatus } from '../../../db/entities/User';
import { generateJWTToken } from '../../../helpers/auth/generateJWTToken';

export async function resetPassword(_: any, args: any) {
  const { token, password } = args;

  const connection = getConnection();

  const resetTokenRepository = connection.getRepository(ResetToken);

  const resetToken = await resetTokenRepository
    .findOne(
      { token: hashjs.sha256().update(token).digest('hex')},
      {relations: ['user'] },
    );

  if (!resetToken || resetToken.invalidatedAt || resetToken.deletedAt || resetToken.resetAt) {
    throw new AuthenticationError('Invalid reset token');
  }

  if (!resetToken.user) {
    throw new AuthenticationError('Invalid reset token');
  }

  if (resetToken.user.status !== UserStatus.ACTIVE) {
    throw new AuthenticationError('Invalid user, contact admin about account status');
  }

  if (!resetToken.user.confirmedAt) {
    throw new AuthenticationError('Invalid user not confirmed');
  }

  if (resetToken.user.deletedAt) {
    throw new AuthenticationError('Invalid user');
  }

  const userRepository = connection.getRepository(User);

  resetToken.user.password = await bcrypt.hash(password, config.auth.saltRounds);
  resetToken.resetAt = new Date();

  await userRepository.save(resetToken.user);
  await resetTokenRepository.save(resetToken);

  const newtoken = generateJWTToken(resetToken.user);

  return {
    token: newtoken,
    user: resetToken.user,
  };

}