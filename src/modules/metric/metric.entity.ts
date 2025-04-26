import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../user/user.entity';

export enum MetricType {
    DISTANCE = 'distance',
    TEMPERATURE = 'temperature'
}

export enum MetricUnit {
    METER = 'meter',
    CENTIMETER = 'centimeter',
    INCH = 'inch',
    FOOT = 'foot',
    YARD = 'yard',
    CELSIUS = 'celsius',
    FAHRENHEIT = 'fahrenheit',
    KELVIN = 'kelvin'
}

@Entity()
export class Metric {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: MetricType,
    })
    type: MetricType;

    @Column()
    date: Date;

    @Column()
    value: number;

    @Column({
        type: 'enum',
        enum: MetricUnit,
    })
    unit: MetricUnit;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, user => user.metrics)
    user: User;
}
