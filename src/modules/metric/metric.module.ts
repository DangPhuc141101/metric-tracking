import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetricsService } from './metric.service';
import { MetricsController } from './metric.controller';
import { Metric } from './metric.entity';
import { MetricFactory } from './factories/metric.factory';

@Module({
    imports: [TypeOrmModule.forFeature([Metric])],
    controllers: [MetricsController],
    providers: [MetricsService, MetricFactory],
    exports: [MetricsService],
})
export class MetricModule { }
