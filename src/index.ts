require('dotenv').config();

import express from 'express';
import 'reflect-metadata';

import { ApolloServer } from 'apollo-server-express';
import { createConnection } from 'typeorm';

import { schema } from './graphql';
import { config } from './config';
import entities from './db/entities';

async function startServer() {
  const app = express();

  app.get('/', (req, res) => {
    res.send('Hello World');
  });

  const connection = await createConnection({
    ...config.db,
    entities,
  });

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
