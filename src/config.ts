import { ConnectionOptions } from 'typeorm';
import { SqlServerConnectionCredentialsOptions } from 'typeorm/driver/sqlserver/SqlServerConnectionCredentialsOptions';

interface IConfig {
  db: ConnectionOptions;
  server: any;
}

export const config: IConfig = {
  db: {
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    logging: process.env.DB_LOGGING === 'true',
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT) ? Number(process.env.DB_PORT) : 5432,
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    type: 'postgres',
    username: process.env.DB_USER,
  },
  server: {
    port: process.env.PORT,
  },
};