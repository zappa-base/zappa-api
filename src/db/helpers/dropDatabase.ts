require('dotenv').config();

import { Client } from 'pg';

import { config } from '../../config';

async function createDatabase() {
  const client = new Client({
    user: (config.db as any).username,
    password: (config.db as any).password,
    database: process.env.DB_MAINTENCE,
    host: config.server.host,
    port: (config.db as any).port,
  });

  await client.connect();

  await client.query(`DROP DATABASE "${config.db.database}"`);

  console.log(`Dropped Database: "${config.db.database}"`);

  await client.end();
}

createDatabase();