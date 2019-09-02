import { ForbiddenError, UserInputError } from 'apollo-server-core';
import bcrypt from 'bcrypt';
import { getRepository } from 'typeorm';
import validate from 'validate.js';

import { config } from '../../../config';
import { ResetToken } from '../../../db/entities/ResetToken';
import { User, UserStatus } from '../../../db/entities/User';
import { generateJWTToken } from '../../../helpers/auth/generateJWTToken';
import { hashToken } from '../../../helpers/auth/hashToken';
import { resetPasswordConstraints } from '../../../helpers/validators/resetPasswordConstraints';

export async function resetPassword(_: any, args: any) {
  const { token, password } = args;

  const resetTokenRepository = getRepository(ResetToken);

  const resetToken = await resetTokenRepository.findOne(
    {
      token: hashToken(token),
    },
    { relations: ['user'] },
  );

  if (
    !resetToken ||
    resetToken.invalidatedAt ||
    resetToken.deletedAt ||
    resetToken.resetAt
  ) {
    throw new ForbiddenError('Invalid reset token');
  }

  if (!resetToken.user) {
    throw new ForbiddenError('Invalid reset token');
  }

  if (resetToken.user.status !== UserStatus.ACTIVE) {
    throw new ForbiddenError(
      'Invalid user, contact admin about account status',
    );
  }

  if (!resetToken.user.confirmedAt) {
    throw new ForbiddenError('Invalid user not confirmed');
  }

  if (resetToken.user.deletedAt) {
    throw new ForbiddenError('Invalid user');
  }

  const errors = validate(args, resetPasswordConstraints);

  if (errors) {
    throw new UserInputError('Invalid User input', {
      inputErrors: errors,
    });
  }

  const userRepository = getRepository(User);

  resetToken.user.password = await bcrypt.hash(
    password,
    config.auth.saltRounds,
  );
  resetToken.resetAt = new Date();

  await userRepository.save(resetToken.user);
  await resetTokenRepository.save(resetToken);

  const newtoken = generateJWTToken(resetToken.user);

  return {
    token: newtoken,
    user: resetToken.user,
  };
}
