import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Metric } from './metric.entity';
import { CreateMetricDto, ListMetricsQueriesDto, ListMetricsChartQueriesDto } from './dtos';
import { MetricFactory } from './factories/metric.factory';
import { PeriodRange } from './interfaces/metric.interface';

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

    private getDateRange(period: PeriodRange): { startDate: Date; endDate: Date } {
        const endDate = new Date();
        const startDate = new Date(endDate);

        switch (period) {
            case PeriodRange.LAST_MONTH:
                startDate.setMonth(startDate.getMonth() - 1);
                break;
            case PeriodRange.LAST_TWO_MONTHS:
                startDate.setMonth(startDate.getMonth() - 2);
                break;
            case PeriodRange.LAST_3_MONTHS:
                startDate.setMonth(startDate.getMonth() - 3);
                break;
            default:
                throw new Error('Invalid period');
        }
        return { startDate, endDate };
    }

    async getDailyLatestMetrics(query: ListMetricsChartQueriesDto, userId: number): Promise<Metric[]> {
        const { type, targetUnit, period } = query;
        const { startDate, endDate } = this.getDateRange(period);

        const whereClauses = ['user_id = $1'];
        const params: any[] = [userId];
        let paramIndex = 2;

        if (type) {
            whereClauses.push(`type = $${paramIndex}`);
            params.push(type);
            paramIndex++;
        }

        if (startDate && endDate) {
            whereClauses.push(`created_at BETWEEN $${paramIndex} AND $${paramIndex + 1}`);
            params.push(startDate, endDate);
            paramIndex += 2;
        }

        const whereClause = whereClauses.join(' AND ');

        const metrics: Metric[] = await this.metricsRepository.query(`
            SELECT DISTINCT ON (DATE(date)) id, user_id, type, date, value, unit, created_at
            FROM metrics
            WHERE ${whereClause}
            ORDER BY DATE(date), created_at DESC;
          `, params);

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
