import { getConnection } from 'typeorm';

import { User } from '../../db/entities/User';

import { album, albums } from './Album';
import { currentUser } from './Auth/currentUser';

export const Query = {
  album,
  albums,
  currentUser,
  users: async () =>
    getConnection()
      .getRepository(User)
      .find(),
};
