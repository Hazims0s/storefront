import { Express } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import ProductController from './product.controller';
import { addProductValidation , getProductValidation} from './product.schemas';

const productRouter = (app: Express) => {

  app.get('/products', requireAuth, ProductController.index);
  app.get('/products/:id', requireAuth,validateRequest(getProductValidation)
    ,ProductController.getProduct);

  app.post('/products/create', requireAuth,
    validateRequest(addProductValidation), ProductController.create);
};

export default productRouter;