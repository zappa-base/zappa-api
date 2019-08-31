import { getRepository } from 'typeorm';

import { Album } from '../../../db/entities/Album';

export async function albums() {
  return getRepository(Album).find();
}
