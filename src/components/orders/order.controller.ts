import { Request, Response } from 'express';
import { BadRequestError } from '../../errors/bad-request-error';
import { ICreateOrderSerilaized, ICreateOrder } from './order.interfaces';
import { NotFoundError } from '../../errors/not-found-error';
import CustomResponse from '../../utils/custom-response';
import Order from './order.model';
import Product from '../product/product.model';
import User from '../user/user.model';

class OrderController {

  async index(req: Request, res: Response){
    const orders = await Order.findAll();
    CustomResponse.send(res, { orders });
  }

  async getOrder(req: Request, res: Response){
    const order = await Order.findOneById(+req.params.id);
    if(!order){
      throw new NotFoundError('Order Not Found!');
    }
    CustomResponse.send(res, { order });
  }

  async create(req: Request, res: Response){
    const {product_id,
      qty,
      user_id,
    } = req.body;
    if(!(await Product.productExits(product_id)) || !(await User.userExits(user_id)))
    {
      throw new BadRequestError('Incorrect User Or Product');
    }
    const dataObject: ICreateOrder = { product_id, qty, user_id };
    const order = await Order.create(dataObject);
    if(order){
      const result = {order};
      return CustomResponse.send(res, result, 'Created Successfully', 201);
    }else{
      throw new Error();
    }
  }
}

export default new OrderController();