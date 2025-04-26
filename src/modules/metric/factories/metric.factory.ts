import { DistanceUnit, IMetric, MetricType, TemperatureUnit } from '../interfaces/metric.interface';
import { DistanceMetric } from '../implementations/distance-metric';
import { TemperatureMetric } from '../implementations/temperature-metric';

export class MetricFactory {
    static createMetric(
        type: MetricType,
        value: number,
        unit: string,
        date?: Date
    ): IMetric {
        switch (type) {
            case MetricType.DISTANCE:
                return new DistanceMetric(value, unit as DistanceUnit, date);
            case MetricType.TEMPERATURE:
                return new TemperatureMetric(value, unit as TemperatureUnit, date);
            default:
                throw new Error(`Unsupported metric type: ${type}`);
        }
    }
}
