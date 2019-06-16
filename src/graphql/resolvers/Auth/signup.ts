import { ApolloError, ForbiddenError } from 'apollo-server-core';
import bcrypt from 'bcrypt';
import { getConnection } from 'typeorm';

import { config } from '../../../config';
import { User } from '../../../db//entities/User';
import { UserRepository } from '../../../db/repositories/UserRepository';
import { sendConfirmationEmail } from '../../../emails/confirmationEmail';
import { setUserConfirmationToken } from '../../../helpers/auth/setUserConfirmationToken';

export async function signup(_: any, args: any) {
  const { email, password, nickname } = args;

  const connection = getConnection();

  const userRepository = connection.getCustomRepository(UserRepository);

  const userExists = await userRepository.findByEmail(email);

  if (userExists) {
    throw new ForbiddenError('Email already taken');
  }

  const user = new User();

  user.nickname = nickname;
  user.email = email;
  user.password = await bcrypt.hash(password, config.auth.saltRounds);

  const newUser = await userRepository.save(user);

  const confirmationToken = await setUserConfirmationToken(connection, newUser);

  try {
    await sendConfirmationEmail(newUser, confirmationToken);
  } catch (error) {
    console.error(error);
    throw new ApolloError('Unable to send confirmation email');
  }

  return true;

}