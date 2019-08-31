import { UserInputError } from 'apollo-server-core';
import { getRepository } from 'typeorm';

import { Album } from '../../../db/entities/Album';

import { IAlbumInput } from './types';

interface IArgs {
  id: string;
  input: IAlbumInput;
}

export async function updateAlbum(_: any, args: IArgs) {
  const albumRepository = getRepository(Album);

  const album = await albumRepository.findOne(args.id);

  if (!album) {
    throw new UserInputError('No Album with that id found.');
  }

  Object.assign(album, args.input);

  return albumRepository.save(album);
}
