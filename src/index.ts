require('dotenv').config();

import express from 'express';
import 'reflect-metadata';

import { ApolloServer } from 'apollo-server-express';

import { config } from './config';
import { createDBConnection } from './db/createDBConnection';
import { schema } from './graphql';

async function startServer() {
  const app = express();

  app.get('/', (req, res) => {
    res.send('Hello from Zappa-Base');
  });

  await createDBConnection();

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
