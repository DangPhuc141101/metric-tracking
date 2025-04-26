export const configSchema = () => ({
  env: process.env.APP_ENV,
  port: process.env.APP_PORT ? parseInt(process.env.APP_PORT, 10) : undefined,
  debugMode: process.env.DEBUG_MODE === 'true',
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
});
