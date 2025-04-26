export enum MetricType {
    DISTANCE = 'distance',
    TEMPERATURE = 'temperature'
}

export enum DistanceUnit {
    METER = 'meter',
    CENTIMETER = 'centimeter',
    INCH = 'inch',
    FOOT = 'foot',
    YARD = 'yard',
}

export enum TemperatureUnit {
    CELSIUS = 'celsius',
    FAHRENHEIT = 'fahrenheit',
    KELVIN = 'kelvin'
}

export interface IMetric {
    type: MetricType;
    value: number;
    unit: string;
    date: Date;
    convertTo(targetUnit: string): number;
}

export interface IMetricUnitConverter {
    convert(value: number, fromUnit: string, toUnit: string): number;
}

export enum PeriodRange {
    LAST_MONTH = 'last_month',
    LAST_TWO_MONTHS = 'last_two_months',
    LAST_3_MONTHS = 'last_3_months',
} 
