require('dotenv').config();

import express from 'express';
import 'reflect-metadata';

import { ApolloServer } from 'apollo-server-express';
import { createConnection, ConnectionOptions } from 'typeorm';

import { schema } from './graphql';
import { config } from './config';
import dbconfig from '../ormconfig.json';

async function startServer() {
  const app = express();

  app.get('/', (req, res) => {
    res.send('Hello World');
  });

  const mergeConfig: ConnectionOptions = {
    type: 'postgres',
    database: config.server.database,
    username: config.server.username,
    password: config.server.password,
    host: config.server.host,
    ...dbconfig,
  };

  const connection = await createConnection(mergeConfig);

  if (connection.isConnected) {
    console.log('Database connected.');
  }

  const server = new ApolloServer({
    introspection : true,
    playground: true,
    ...schema,
  });

  server.applyMiddleware({ app });

  const PORT = config.server.port || 4000;

  app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}/graphql 🚀`);
  });
}

startServer();
