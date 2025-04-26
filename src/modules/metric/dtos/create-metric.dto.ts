import { IsString, IsNotEmpty, IsEnum, IsNumber, IsDate, ValidatorConstraint, ValidationArguments, ValidatorConstraintInterface, Validate } from "class-validator";
import { Type } from 'class-transformer';
import { MetricType, MetricUnit } from "../metric.entity";
import { METRIC_RULES } from "@common/constants/rules.constant";

@ValidatorConstraint({ name: 'isValidUnitForType', async: false })
export class IsValidUnitForType implements ValidatorConstraintInterface {
    validate(unit: string, args: ValidationArguments) {
        const type = (args.object as any).type;
        if (!type || !METRIC_RULES[type]) {
            return false;
        }
        return METRIC_RULES[type].validUnits.includes(unit);
    }

    defaultMessage(args: ValidationArguments) {
        const type = (args.object as any).type;
        return METRIC_RULES[type]?.errorMessages.invalidUnit || 'Invalid unit for the specified metric type';
    }
}

export class CreateMetricDto {
    @IsString()
    @IsNotEmpty()
    @IsEnum(MetricType)
    type: MetricType;

    @IsNumber()
    @IsNotEmpty()
    value: number;

    @IsString()
    @IsNotEmpty()
    @IsEnum(MetricUnit)
    @Validate(IsValidUnitForType)
    unit: MetricUnit;

    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    date: Date;
}

