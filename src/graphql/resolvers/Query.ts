import { getRepository } from 'typeorm';

import { User } from '../../db/entities/User';

import { album, albums } from './Album';
import { currentUser } from './Auth/currentUser';

export const Query = {
  album,
  albums,
  currentUser,
  users: async () => getRepository(User).find(),
};
