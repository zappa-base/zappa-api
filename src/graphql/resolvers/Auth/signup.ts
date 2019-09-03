import {
  ApolloError,
  ForbiddenError,
  UserInputError,
} from 'apollo-server-core';
import bcrypt from 'bcrypt';
import { getCustomRepository } from 'typeorm';
import validate from 'validate.js';

import { config } from '../../../config';
import { User } from '../../../db//entities/User';
import { UserRepository } from '../../../db/repositories/UserRepository';
import { sendConfirmationEmail } from '../../../emails/confirmationEmail';
import { setUserConfirmationToken } from '../../../helpers/auth/setUserConfirmationToken';
import { signupConstraints } from '../../../helpers/validators/signupConstraints';

export async function signup(_: any, args: any) {
  const { email, endpoint, password, nickname } = args;

  const userRepository = getCustomRepository(UserRepository);

  const userExists = await userRepository.findByEmail(email);

  if (userExists) {
    throw new ForbiddenError('Email already taken');
  }

  const errors = validate(args, signupConstraints);

  if (errors) {
    throw new UserInputError('Invalid User input', {
      inputErrors: errors,
    });
  }

  const user = new User();

  user.nickname = nickname;
  user.email = email;
  user.password = await bcrypt.hash(password, config.auth.saltRounds);

  const newUser = await userRepository.save(user);

  const confirmationToken = await setUserConfirmationToken(newUser);

  try {
    await sendConfirmationEmail(newUser, confirmationToken, endpoint);
  } catch (error) {
    console.error(error);
    throw new ApolloError('Unable to send confirmation email');
  }

  return true;
}
