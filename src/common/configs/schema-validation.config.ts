import Joi from 'joi';

export const schemaValidation = {
  // App configuration
  APP_ENV: Joi.string()
    .valid('local', 'development', 'production', 'staging')
    .default('development'),
  APP_PORT: Joi.number().required(),
};
