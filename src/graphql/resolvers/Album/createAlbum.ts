import { getRepository } from 'typeorm';

import { Album } from '../../../db/entities/Album';

import { IAlbumInput } from './types';

interface IArgs {
  input: IAlbumInput;
}

export async function createAlbum(_: any, args: IArgs) {
  const albumRepository = getRepository(Album);

  const album = new Album();

  Object.assign(album, args.input);

  return albumRepository.save(album);
}
