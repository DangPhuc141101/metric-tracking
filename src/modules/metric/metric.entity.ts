import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
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

@Entity({ name: 'metrics' })
export class Metric {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'user_id' })
    userId: number;

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

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(() => User, user => user.metrics)
    @JoinColumn({ name: 'user_id' })
    user: User;
}
