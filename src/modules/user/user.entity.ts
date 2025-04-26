import { Metric } from "@modules/metric/metric.entity";
import { OneToMany, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Metric, (metric) => metric.user)
    metrics: Metric[];
}