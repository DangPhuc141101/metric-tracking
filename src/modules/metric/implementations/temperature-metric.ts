import { IMetric, MetricType, TemperatureUnit } from '../interfaces/metric.interface';
import { TemperatureConverter } from '../converters/temperature-converter';
export class TemperatureMetric implements IMetric {
    private converter: TemperatureConverter;

    constructor(
        public value: number,
        public unit: TemperatureUnit,
        public date: Date = new Date()
    ) {
        this.converter = new TemperatureConverter();
        this.type = MetricType.TEMPERATURE;
    }

    type: MetricType;

    convertTo(targetUnit: TemperatureUnit): number {
        return this.converter.convert(this.value, this.unit, targetUnit);
    }
}
