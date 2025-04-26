import {
    IsEnum, IsString, Validate, IsOptional
} from 'class-validator';
import { MetricType, MetricUnit } from '../metric.entity';
import { IsValidUnitForType } from './create-metric.dto';
import { PeriodRange } from '../interfaces/metric.interface';

export class ListMetricsChartQueriesDto {
    @IsString()
    @IsOptional()
    @IsEnum(MetricType)
    type: MetricType;

    @IsString()
    @IsOptional()
    @IsEnum(MetricUnit)
    @Validate(IsValidUnitForType)
    targetUnit?: MetricUnit;

    @IsString()
    @IsOptional()
    @IsEnum(PeriodRange)
    period?: PeriodRange
}
