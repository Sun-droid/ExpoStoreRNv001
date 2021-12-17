import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProductsTable1638117577460 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products01Migration',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'Name',
            type: 'text',
          },
          {
            name: 'Type',
            type: 'text',
          },
          {
            name: 'Price',
            type: 'number',
          },
          {
            name: 'is_toggled',
            type: 'boolean',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products01Migration');
  }
}