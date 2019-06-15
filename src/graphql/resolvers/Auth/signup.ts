import { getConnection } from 'typeorm';
import bcrypt from 'bcrypt';

import { User } from '../../../db//entities/User';
import { config } from '../../../config';
import { ForbiddenError, ApolloError } from 'apollo-server-core';
import { generateJWTToken } from '../../../helpers/auth/generateJWTToken';
import { ConfirmationToken } from '../../../db/entities/ConfirmationToken';
import { generateUUIDToken } from '../../../helpers/auth/generateUUIDToken';
import { setUserConfirmationToken } from '../../../helpers/auth/setUserConfirmationToken';
import { sendConfirmationEmail } from './confirmationEmail';

export async function signup(_: any, args: any) {
  const { email, password, nickname } = args;

  const connection = getConnection();

  const userRepository = connection.getRepository(User);

  const userExists = await userRepository.findOne({
    email,
  });

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