import { Express } from 'express';
import user from './user/user.routes';
import product from './product/product.routes';
import order from './orders/order.routes';

class routing {

  api(app: Express) {
    user(app);
    product(app);
    order(app);
  }
}
export default new routing();