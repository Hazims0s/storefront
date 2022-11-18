import Common from '../../utils/common';

import {ICreateOrder, IOrderSerialized, ICreateOrderSerilaized,
  IOrder, IOrderProductItem } from './order.interfaces';

class Order {

  static tableName = 'orders';
  static products_orders = ' orders_products';

  static async findOneById(id: number): Promise<IOrderSerialized | null> {
    const rowsOrder = await Common.dbFetch(Order.tableName, { id });
    if (rowsOrder?.length) {
      const order = rowsOrder[0] as IOrderSerialized;
      const rowsProducts = await Common.dbFetch(Order.products_orders,{order_id:order.id});
      if(rowsProducts?.length)
      {
        order.products = rowsProducts! as IOrderProductItem[];
      }
      return order;
    } else {
      return null;
    }
  }

  static async orderExits(id: number): Promise<boolean | null> {
    const rows = await Common.dbFetch(Order.tableName, { id });
    if (rows?.length) {
      return true;
    } else {
      return false;
    }
  }

  static async findAll(): Promise<IOrderSerialized[]> {

    const orderRows = await Common.dbFetch(
      Order.tableName,
      null,
      [
        'id',
        'user_id',
        'status',
        'created_at',
      ],
    );
    let orders= Array<IOrderSerialized>();
    const productRows = await Common.dbFetch(
      Order.products_orders
      , null,
      [
        'id',
        'product_id',
        'qty',
        'order_id',
        'created_at',
      ],
    );
    const allProducts = productRows as IOrderProductItem[];
    orderRows?.forEach(async item => {
      let orderItem = item as IOrderSerialized;
      let products =  Array<IOrderProductItem>();
      allProducts.forEach(producItem => {
        if(producItem.order_id==orderItem.id){
          products.push(producItem);
        }
      });
      orderItem.products=products!;
      orders.push(orderItem);
    });
    return orders;
  }

  static async create(order: ICreateOrder): Promise<ICreateOrderSerilaized | null> {
    try {
      const insertOrder: IOrder = {
        user_id: order.user_id,
        status: false,
      };
      const insertQuery = await Common.dbInsertion(Order.tableName, insertOrder);
      console.log(insertQuery);
      if (insertQuery && insertQuery.inserted) {
        const productOrder = {
          product_id: order.product_id,
          qty: order.qty,
          order_id: insertQuery.data[0].id,
        };
        const insertProducts = await Common.dbInsertion(Order.products_orders, productOrder);
        if (insertProducts && insertProducts.inserted) {
          const newOrder: ICreateOrderSerilaized = {
            id: insertQuery.data[0].id,
            product: {
              product_id: insertProducts.data[0].product_id,
              qty: insertProducts.data[0].qty,
            },
            user_id: order.user_id,
            status: insertQuery.data[0].status,
          };
          return newOrder;
        }
      } else {
        return null;
      }
      return null;
    }
    catch (err) {
      throw (err);
    }
  }
}

export default Order;