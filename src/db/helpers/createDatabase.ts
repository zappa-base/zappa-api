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

  await client.query(`CREATE DATABASE "${config.db.database}"`);

  console.log(`Created Database: "${config.db.database}"`);

  await client.end();
}

createDatabase();