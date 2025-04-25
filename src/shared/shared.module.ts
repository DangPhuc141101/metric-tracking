import { schemaValidation } from '@config/schema-validation.config';
import { configSchema } from '@config/schema.config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [configSchema],
      validationSchema: Joi.object(schemaValidation),
    }),
  ],
})
export class SharedModule {}
