import { createConnection } from 'typeorm';

import { config } from '../config';

import entities from './entities';

export async function createDBConnection() {
  const connection = await createConnection({
    ...config.db,
    entities,
  });

  if (connection.isConnected) {
    console.log('Database connected.');
  }

  return connection;
}