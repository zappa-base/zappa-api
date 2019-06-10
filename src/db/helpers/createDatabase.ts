require('dotenv').config();

import { Client } from 'pg';

import { config } from '../../config';
import { confirmScript } from './confirmDBAction';

async function createDatabase() {

  await confirmScript('create');

  const client = new Client({
    user: (config.db as any).username,
    password: (config.db as any).password,
    database: process.env.DB_MAINTENCE || 'postgres',
    host: config.server.host,
    port: (config.db as any).port,
  });

  await client.connect();

  await client.query(`CREATE DATABASE "${config.db.database}"`);

  console.log(`Created Database: "${config.db.database}"`);

  await client.end();
}

createDatabase();