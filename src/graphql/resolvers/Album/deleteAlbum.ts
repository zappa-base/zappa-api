import { UserInputError } from 'apollo-server-core';
import { getRepository } from 'typeorm';

import { Album } from '../../../db/entities/Album';

interface IArgs {
  id: string;
}

export async function deleteAlbum(_: any, args: IArgs) {
  const albumRepository = getRepository(Album);

  const album = await albumRepository.findOne(args.id);

  if (!album) {
    throw new UserInputError('No Album with that id found.');
  }

  return albumRepository.remove(album);
}
