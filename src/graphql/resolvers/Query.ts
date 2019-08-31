import { getConnection, getRepository } from 'typeorm';

import { Album } from '../../db/entities/Album';
import { User } from '../../db/entities/User';

import { currentUser } from './Auth/currentUser';

export const Query = {
  albums: async () => await getRepository(Album).find(),
  currentUser,
  users: async () =>
    getConnection()
      .getRepository(User)
      .find(),
};
