require('dotenv').config();

import { Client } from 'pg';
import { PostgresConnectionCredentialsOptions } from 'typeorm/driver/postgres/PostgresConnectionCredentialsOptions';

import { config } from '../../config';
import { confirmScript } from './confirmDBAction';

async function createDatabase() {
  await confirmScript('drop');

  const client = new Client({
    user: (config.db as any).username,
    password: (config.db as any).password,
    database: process.env.DB_MAINTENCE || 'postgres',
    host: (config.db as PostgresConnectionCredentialsOptions).host,
    port: (config.db as any).port,
  });

  await client.connect();

  await client.query(`DROP DATABASE "${config.db.database}"`);

  console.log(`Dropped Database: "${config.db.database}"`);

  await client.end();
}

createDatabase();