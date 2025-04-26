
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();
console.log(`${__dirname}/../../../database/migrations/*{.ts,.js}`)
export default new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [`${__dirname}/../../modules/**/*.entity.{ts,js}`],
    migrations: [`${__dirname}/../../database/migrations/*{.ts,.js}`],
    // synchronize: process.env.APP_ENV === 'local', // Only sync in local environment
    logging: process.env.APP_ENV === 'local',
})