import faker, { random } from 'faker';
import moment from 'moment';
import { Connection } from 'typeorm';

import { Album } from '../entities/Album';
import albumSeedData from '../mocks/albums.json';

faker.seed(908235798534);

export default async function createAlbums(connection: Connection) {
  const albums = albumSeedData.map((item) => ({
    ...item,
    catalogNumber: random.alphaNumeric(6).toUpperCase(),
    label: 'Zappa LLC INC',
    releaseDate: moment(item.releaseDate, 'MMM Do YYYY').toISOString(),
  }));

  const albumRepository = connection.getRepository(Album);

  const results = await albumRepository.insert(albums);

  console.info('Records Created: ', results.raw.length);

  return connection;
}
