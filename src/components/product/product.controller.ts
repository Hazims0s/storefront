import { Request, Response } from 'express';
import { BadRequestError } from '../../errors/bad-request-error';
import { IProduct, IProductSerialized } from './product.interfaces';
import Product from './product.model';
import { NotFoundError } from '../../errors/not-found-error';
import CustomResponse from '../../utils/custom-response';

class ProductController {

  async index(req: Request, res: Response){
    const products = await Product.findAll();
    CustomResponse.send(res, { products });
  }

  async getProduct(req: Request, res: Response){
    const product = await Product.findOneById(+req.params.id);
    if(!product){
      throw new NotFoundError('Product Not Found!');
    }
    CustomResponse.send(res, { product });
  }

  async create(req: Request, res: Response){
    const {
      name,
      price,
    } = req.body;
    const dataObject: IProduct = { name, price};
    const product = await Product.create(dataObject);
    if(product){
      const result = { product};
      return CustomResponse.send(res, result, 'Created Successfully', 201);
    }else{
      throw new Error();
    }
  }
}

export default new ProductController();