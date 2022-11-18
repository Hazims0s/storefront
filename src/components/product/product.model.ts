import Common from '../../utils/common';
import { IProduct , IProductSerialized} from './product.interfaces';

class Product {
  static tableName = 'products';

  static async findOneById(id: number): Promise<IProductSerialized | null>{
    const rows = await Common.dbFetch(Product.tableName, { id });
    if(rows?.length){
      const product = rows[0] as IProductSerialized;
      return product;
    }else{
      return null;
    }
  }

  static async findAll(): Promise<IProductSerialized[]>{
    const rows = await Common.dbFetch(
      Product.tableName,
      null,
      [
        'id',
        'name',
        'price',
        'created_at',
      ],
    );
    return rows as IProductSerialized[];
  }

  static async productExits(id: number): Promise<boolean | null>{
    const rows = await Common.dbFetch(Product.tableName, { id });
    if(rows?.length){
      return true;
    }else{
      return false;
    }
  }
  static async create(product: IProduct): Promise<IProduct | null>{
    const insertQuery = await Common.dbInsertion(Product.tableName, product);
    if(insertQuery && insertQuery.inserted){
      const newProduct = insertQuery.data[0] as IProductSerialized;
      return newProduct;
    }else{
      return null;
    }
  }
}

export default Product;