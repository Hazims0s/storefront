import { Express } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import orderController from './order.controller';
import {addOrderValidation ,getOrderValidation} from './order.schemas';

const productRouter = (app: Express) => {

  app.get('/orders', requireAuth, orderController.index);
  app.get('/orders/:id', requireAuth,validateRequest(getOrderValidation)
    ,orderController.getOrder);

  app.post('/orders/create', requireAuth,
    validateRequest(addOrderValidation), orderController.create);
};

export default productRouter;