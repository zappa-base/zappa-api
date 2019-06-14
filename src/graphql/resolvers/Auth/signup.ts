import { getConnection } from 'typeorm';
import bcrypt from 'bcrypt';

import { User } from '../../../db//entities/User';
import { config } from '../../../config';
import { ForbiddenError } from 'apollo-server-core';
import { generateJWTToken } from '../../../helpers/auth/generateJWTToken';

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

  const token = generateJWTToken(newUser);

  return {
    token,
    user: newUser,
  };

}