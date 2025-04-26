import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Metric } from './metric.entity';
import { CreateMetricDto } from './dtos/create-metric.dto';

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
}