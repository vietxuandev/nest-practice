import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { baseColumns, tableNames } from '../helpers/migration';

export class CreateUsersTable1723685605485 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: tableNames.users,
        columns: [
          ...baseColumns,
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'firstName',
            type: 'varchar',
          },
          {
            name: 'lastName',
            type: 'varchar',
          },
          {
            name: 'password',
            type: 'varchar',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableNames.users);
  }
}
