import { IMetricUnitConverter } from '../interfaces/metric.interface';
import { DistanceUnit } from '../interfaces/metric.interface';

export class DistanceConverter implements IMetricUnitConverter {
    private conversionRules = {
        [DistanceUnit.METER]: 1,    // base unit
        [DistanceUnit.CENTIMETER]: 0.01,
        [DistanceUnit.INCH]: 0.0254,
        [DistanceUnit.FOOT]: 0.3048,
        [DistanceUnit.YARD]: 0.9144
    };

    toBase(value: number, fromUnit: DistanceUnit): number {
        return value * this.conversionRules[fromUnit];
    }

    convert(value: number, fromUnit: DistanceUnit, toUnit: DistanceUnit): number {
        return this.toBase(value, fromUnit) / this.conversionRules[toUnit];
    }
}
