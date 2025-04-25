export const configSchema = () => ({
  env: process.env.APP_ENV,
  port: process.env.APP_PORT ? parseInt(process.env.APP_PORT, 10) : undefined,
  debugMode: process.env.DEBUG_MODE === 'true',
});
