import 'dotenv/config';
import { Client } from 'pg';
import { PostgresConnectionCredentialsOptions } from 'typeorm/driver/postgres/PostgresConnectionCredentialsOptions';

import { config } from '../../config';

import { confirmScript } from './confirmDBAction';

async function createDatabase() {
  await confirmScript('create');

  const client = new Client({
    database: process.env.DB_MAINTENCE || 'postgres',
    host: (config.db as PostgresConnectionCredentialsOptions).host,
    password: (config.db as any).password,
    port: (config.db as any).port,
    user: (config.db as any).username,
  });

  await client.connect();

  await client.query(`CREATE DATABASE "${config.db.database}"`);

  console.info(`Created Database: "${config.db.database}"`);

  await client.end();
}

createDatabase();
