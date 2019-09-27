import { createConnection, ConnectionOptions } from 'typeorm';

import { config } from '../config';

import entities from './entities';

export async function createDBConnection(
  configOverides: Partial<ConnectionOptions> = {},
) {
  const connection = await createConnection({
    ...config.db,
    ...configOverides,
    entities,
  } as ConnectionOptions);

  if (connection.isConnected) {
    console.info('Database connected.');
  }

  return connection;
}
