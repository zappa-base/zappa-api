import { getConnection } from 'typeorm';

import { User } from '../../db/entities/User';

import { currentUser } from './Auth/currentUser';

export const Query = {
  currentUser,
  users: async () =>
    getConnection()
      .getRepository(User)
      .find(),
};
