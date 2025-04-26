import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Metric } from './metric.entity';
import { CreateMetricDto, ListMetricsQueriesDto } from './dtos';
import { MetricFactory } from './factories/metric.factory';

@Injectable()
export class MetricsService {
    constructor(
        @InjectRepository(Metric)
        private metricsRepository: Repository<Metric>,
    ) { }

    async create(createMetricDto: CreateMetricDto, userId: number): Promise<Metric> {
        const metric = this.metricsRepository.create({ ...createMetricDto, userId });
        return await this.metricsRepository.save(metric);
    }

    async findAll(query: ListMetricsQueriesDto, userId: number): Promise<Metric[]> {
        const { type, targetUnit } = query;

        const metrics = await this.metricsRepository.find({
            where: { userId, type },
            order: {
                id: 'DESC'
            }
        });

        if (targetUnit) {
            return metrics.map(metric => {
                const metricInstance = MetricFactory.createMetric(metric.type, metric.value, metric.unit);
                metric.value = metricInstance.convertTo(targetUnit);
                metric.unit = targetUnit;
                return metric
            });
        }

        return metrics;
    }
}
