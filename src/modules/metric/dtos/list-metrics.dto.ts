import { IsEnum, IsOptional, IsString, Validate } from 'class-validator';
import { MetricType, MetricUnit } from '../metric.entity';
import { IsValidUnitForType } from './create-metric.dto';

export class ListMetricsQueriesDto {
    @IsOptional()
    @IsEnum(MetricType)
    type?: MetricType;

    @IsOptional()
    @IsString()
    @IsEnum(Object.values(MetricUnit))
    @Validate(IsValidUnitForType)
    targetUnit?: MetricUnit;
}
