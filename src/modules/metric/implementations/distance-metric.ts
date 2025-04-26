import { IMetric, MetricType, DistanceUnit } from '../interfaces/metric.interface';
import { DistanceConverter } from '../converters/distance-converter';

export class DistanceMetric implements IMetric {
    private converter: DistanceConverter;

    constructor(
        public value: number,
        public unit: DistanceUnit,
        public date: Date = new Date()
    ) {
        this.converter = new DistanceConverter();
        this.type = MetricType.DISTANCE;
    }

    type: MetricType;

    convertTo(targetUnit: DistanceUnit): number {
        return this.converter.convert(this.value, this.unit, targetUnit);
    }
}
