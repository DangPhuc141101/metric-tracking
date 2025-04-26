import { Controller, Post, Body, UsePipes, ValidationPipe, Request, UseGuards, Get, Query } from '@nestjs/common';
import { MetricsService } from './metric.service';
import { Metric } from './metric.entity';
import { CreateMetricDto, ListMetricsQueriesDto, ListMetricsChartQueriesDto } from './dtos';
import { AuthGuard } from '@providers/guards/auth.guard';

@Controller('metrics')
@UsePipes(new ValidationPipe({ transform: true }))
export class MetricsController {
    constructor(private readonly metricsService: MetricsService) { }

    @Post()
    @UseGuards(AuthGuard)
    async create(@Body() createMetricDto: CreateMetricDto, @Request() req): Promise<Metric> {
        return await this.metricsService.create(createMetricDto, req.user.id);
    }

    @Get()
    @UseGuards(AuthGuard)
    async findAll(
        @Query() query: ListMetricsQueriesDto,
        @Request() req
    ): Promise<Metric[]> {
        return await this.metricsService.findAll(query, req.user.id);
    }

    @Get('chart')
    @UseGuards(AuthGuard)
    async getSummary(
        @Query() query: ListMetricsChartQueriesDto,
        @Request() req): Promise<Metric[]> {
        return await this.metricsService.getDailyLatestMetrics(query, req.user.id);
    }
}
