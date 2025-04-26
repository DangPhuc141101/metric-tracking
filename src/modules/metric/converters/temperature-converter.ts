import { IMetricUnitConverter } from '../interfaces/metric.interface';
import { TemperatureUnit } from '../interfaces/metric.interface';

export class TemperatureConverter implements IMetricUnitConverter {
    private readonly BASE_UNIT: TemperatureUnit = TemperatureUnit.CELSIUS;

    toBase(value: number, fromUnit: TemperatureUnit): number {
        switch (fromUnit) {
            case this.BASE_UNIT:
                return value;
            case TemperatureUnit.FAHRENHEIT:
                return (value - 32) * 5.0 / 9.0;
            case TemperatureUnit.KELVIN:
                return value - 273.15;
        }
    }

    fromBase(value: number, toUnit: TemperatureUnit): number {
        switch (toUnit) {
            case TemperatureUnit.CELSIUS:
                return value;
            case TemperatureUnit.FAHRENHEIT:
                return (value * 9.0 / 5.0) + 32.0;
            case TemperatureUnit.KELVIN:
                return value + 273.15;
        }
    }


    convert(value: number, fromUnit: TemperatureUnit, toUnit: TemperatureUnit): number {
        const valueInBaseUnit = this.toBase(value, fromUnit);
        return this.fromBase(valueInBaseUnit, toUnit);
    }
}
