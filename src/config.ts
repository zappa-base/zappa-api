export const config = {
  server: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    maintenceDB: process.env.DB_MAINTENCE_DATABSE,
    host: process.env.DB_HOST,
    port: process.env.PORT,
  }
};