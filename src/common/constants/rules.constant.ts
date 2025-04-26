import { MetricType, MetricUnit } from "@modules/metric/metric.entity";

const VALID_DISTANCE_UNITS = [MetricUnit.METER, MetricUnit.CENTIMETER, MetricUnit.FAHRENHEIT, MetricUnit.INCH, MetricUnit.YARD];
const VALID_TEMPERATURE_UNITS = [MetricUnit.CELSIUS, MetricUnit.FAHRENHEIT, MetricUnit.KELVIN];
const BASE_DISTANCE_UNIT = MetricUnit.METER;
const BASE_TEMPERATURE_UNIT = MetricUnit.CELSIUS;

export const METRIC_RULES = {
    [MetricType.DISTANCE]: {
        validUnits: VALID_DISTANCE_UNITS,
        baseUnit: BASE_DISTANCE_UNIT,
        conversionFactors: {
            [MetricUnit.METER]: 1,
            [MetricUnit.CENTIMETER]: 0.01,
            [MetricUnit.INCH]: 0.0254,
            [MetricUnit.YARD]: 0.9144
        },
        validationRules: {
            minValue: 0,
            maxValue: Number.MAX_VALUE
        },
        errorMessages: {
            invalidUnit: `Invalid unit by '${MetricType.DISTANCE}' type. Valid units are: ${VALID_DISTANCE_UNITS.join(', ')}`,
            invalidValue: 'Distance value must be greater than or equal to 0'
        }
    },
    [MetricType.TEMPERATURE]: {
        validUnits: VALID_TEMPERATURE_UNITS,
        baseUnit: BASE_TEMPERATURE_UNIT,
        conversionRules: {
            [MetricUnit.CELSIUS]: {
                toBase: (value: number) => value,
                fromBase: (value: number) => value
            },
            [MetricUnit.FAHRENHEIT]: {
                toBase: (value: number) => (value - 32) * 5 / 9,
                fromBase: (value: number) => (value * 9 / 5) + 32
            },
            [MetricUnit.KELVIN]: {
                toBase: (value: number) => value - 273.15,
                fromBase: (value: number) => value + 273.15
            }
        },
        validationRules: {
            minValue: {
                [MetricUnit.CELSIUS]: -273.15,
                [MetricUnit.FAHRENHEIT]: -459.67,
                [MetricUnit.KELVIN]: 0
            },
            maxValue: Number.MAX_VALUE
        },
        errorMessages: {
            invalidUnit: `Invalid unit by '${MetricType.TEMPERATURE}' type. Valid units are: ${Object.values(VALID_TEMPERATURE_UNITS).join(', ')}`,
            invalidValue: 'Temperature cannot be below absolute zero'
        }
    }
} as const;
