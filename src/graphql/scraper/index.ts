import { ApolloServer } from 'apollo-server-express';
import 'dotenv/config';
import express from 'express';
import scraperSchema from 'graphql-scraper';

import { config } from '../../config';

async function startServer() {
  const app = express();

  const server = new ApolloServer({
    introspection: true,
    playground: true,
    schema: scraperSchema,
  });

  server.applyMiddleware({ app });

  const PORT = (Number(config.server.port) || 4000) + 1;

  app.listen(PORT, () => {
    console.info(`Listening on http://localhost:${PORT}/graphql 🚀`);
  });
}

startServer();
