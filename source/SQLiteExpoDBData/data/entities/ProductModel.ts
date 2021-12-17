import { Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('products')
export class ProductModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  price: number;

  @Column()
  is_toggled: boolean;
}



// @Index(["id"], { unique: true })
//   @PrimaryGeneratedColumn('increment')

  /* public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products');
  } */