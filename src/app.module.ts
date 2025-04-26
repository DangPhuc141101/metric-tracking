import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import dataSourceConfig from '@common/configs/data-source.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceConfig.options)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
