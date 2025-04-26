import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";
import { MetricType, MetricUnit } from "@modules/metric/metric.entity";
export class CreateMetricsTable1745628962995 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'metrics',
            columns: [
                new TableColumn({ name: 'id', type: 'int', isPrimary: true, isGenerated: true }),
                new TableColumn({ name: 'type', type: 'enum', enum: Object.values(MetricType) }),
                new TableColumn({ name: 'date', type: 'date' }),
                new TableColumn({ name: 'value', type: 'decimal', precision: 10, scale: 4 }),
                new TableColumn({ name: 'unit', type: 'enum', enum: Object.values(MetricUnit) }),
                new TableColumn({ name: 'user_id', type: 'int' }),
                new TableColumn({ name: 'created_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' }),
                new TableColumn({ name: 'updated_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' }),
            ],
            foreignKeys: [
                new TableForeignKey({
                    columnNames: ['user_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'users',
                }),
            ],
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('metrics');
    }

}
