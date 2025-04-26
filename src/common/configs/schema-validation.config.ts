import Joi from 'joi';

export const schemaValidation = {
  // App configuration
  APP_ENV: Joi.string()
    .valid('local', 'development', 'production', 'staging')
    .default('development'),
  APP_PORT: Joi.number().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
};
