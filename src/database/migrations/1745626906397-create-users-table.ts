import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1745626906397 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'SERIAL',
                        isPrimary: true,
                    },
                ],
            }),
            true,
        );

        // insert default user
        await queryRunner.query(`INSERT INTO users (id) VALUES (1)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }
}
