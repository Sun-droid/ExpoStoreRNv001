import { Connection, Repository } from 'typeorm';
import { ProductModel } from '../entities/ProductModel';

interface ICreateProductData {
  name: string;
  type: string;
  price: int;
}

export class ProductsRepository {
  private ormRepository: Repository<ProductModel>;

  constructor(connection: Connection) {
    this.ormRepository = connection.getRepository(ProductModel);
  }

  public async getAll(): Promise<ProductModel[]> {
    const products = await this.ormRepository.find();

    return products;
  }

  public async create({ name, type, price }: ICreateProductData): Promise<ProductModel> {
    const product = this.ormRepository.create({
      name,
      type,
      price,
      is_toggled: false,
    });
    product.name;
    product.type;
    product.price;

    await this.ormRepository.save(product);

    return product;
  }

  public async toggle(id: number): Promise<void> {
    await this.ormRepository.query(
      `
      UPDATE
        products
      SET
        is_toggled = ((is_toggled | 1) - (is_toggled & 1))
      WHERE
        id = ?;
      `,
      [id],
    );
  }

  public async displayOne(id: number): Promise<void> {
        console.log("Repository Receive.........: ", id);
        /* console.log("Repository ReturnedIn.........: ", id);
        const one = this.ProductsRepository.findOne( { key: 38 });
        console.log("Repository ReturnedOut.........: ", one);
        return one; */


    const one = await this.ormRepository.query(
      `
      SELECT *
      FROM
        products
      WHERE
        id = ?;
      `,
      [id],
    );

    console.log("Repository ReturnedOut.........: ", one);
    return one;

/*

    await this.ormRepository.query(
      `
      UPDATE
        products
      SET
        is_toggled = ((is_toggled | 1) - (is_toggled & 1))
      WHERE
        id = ?;
      `,
      [id],
    ); */
  }


  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
