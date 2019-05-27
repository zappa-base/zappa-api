require('dotenv').config();

import { Client } from 'pg';

import dbConfig from '../../../ormconfig.json';
import { config } from '../../config';

async function createDatabase() {
  const client = new Client({
    user: config.server.username,
    password: config.server.password,
    database: config.server.maintenceDB,
    host: config.server.host,
    port: dbConfig.port,
  });

  await client.connect();

  await client.query(`CREATE DATABASE "${dbConfig.database}"`);

  console.log(`Created Database: "${dbConfig.database}"`);

  await client.end();
}

createDatabase();