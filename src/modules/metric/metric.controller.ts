import { Controller, Post, Body, UsePipes, ValidationPipe, Request, UseGuards, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';
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
    @ApiOperation({ summary: 'Create a new metric' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                type: { type: 'string', example: 'distance' },
                value: { type: 'number', example: 12.3 },
                unit: { type: 'string', example: 'meter' },
                date: { type: 'string', example: '2024-05-01' }
            }
        }
    })
    @ApiResponse({
        status: 201,
        description: 'The created metric',
        type: Metric
    })
    async create(@Body() createMetricDto: CreateMetricDto, @Request() req): Promise<Metric> {
        return await this.metricsService.create(createMetricDto, req.user.id);
    }

    @Get()
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Get all metrics' })
    @ApiQuery({ name: 'type', required: false, description: 'Metric type (e.g., distance, temperature)' })
    @ApiQuery({ name: 'unit', required: false, description: 'Convert all values to this unit (if supported)' })
    @ApiResponse({
        status: 200,
        description: 'Array of metric records',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    date: { type: 'string', example: '2024-05-01' },
                    value: { type: 'number', example: 12.3 },
                    unit: { type: 'string', example: 'meter' }
                }
            }
        }
    })
    async findAll(
        @Query() query: ListMetricsQueriesDto,
        @Request() req
    ): Promise<Metric[]> {
        return await this.metricsService.findAll(query, req.user.id);
    }

    @Get('chart')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Get daily latest metrics for charting' })
    @ApiQuery({ name: 'type', required: false, description: 'Metric type (e.g., distance, temperature)' })
    @ApiQuery({ name: 'unit', required: false, description: 'Convert all values to this unit (if supported)' })
    @ApiQuery({ name: 'period', required: false, description: 'Time period: 1m (last month), 2m (last 2 months). Defaults to last month.' })
    @ApiResponse({
        status: 200,
        description: 'Array of daily latest metric records',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    date: { type: 'string', example: '2024-05-01' },
                    value: { type: 'number', example: 12.3 },
                    unit: { type: 'string', example: 'meter' }
                }
            }
        }
    })
    async getSummary(
        @Query() query: ListMetricsChartQueriesDto,
        @Request() req): Promise<Metric[]> {
        return await this.metricsService.getDailyLatestMetrics(query, req.user.id);
    }
}
