if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

module.exports = {
  cli: {
    'entitiesDir': 'src/db/entities',
    'migrationsDir': 'src/db/migration',
    'subscribersDir': 'src/db/subscriber'
  },
  database: process.env.DB_DATABASE,
  entities: [
    'src/db/entities/**/*.ts'
  ],
  host: process.env.DB_HOST,
  logging: process.env.DB_LOGGING === 'true',
  migrations: [
    'src/db/migration/**/*.ts'
  ],
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) ? Number(process.env.DB_PORT) : 5432,
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  subscribers: [
    'src/db/subscriber/**/*.ts'
  ],
  type: 'postgres',
  username: process.env.DB_USER,
};