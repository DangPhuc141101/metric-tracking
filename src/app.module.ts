import { Module } from '@nestjs/common';
import dataSource from '@common/configs/data-source.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MetricModule } from './modules/metric/metric.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSource.options), MetricModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
