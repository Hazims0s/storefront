import { Express } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';

import UserController from './user.controller';
import { createUserValidation, getUserValidation } from './user.schemas';

const userRouter = (app: Express) => {

  app.get('/users/', requireAuth, UserController.getUsers);
  app.get('/users/:id', requireAuth, validateRequest(getUserValidation), UserController.getUser);
  app.post('/users/create', validateRequest(createUserValidation), UserController.signUp);
  app.post('/users/login', UserController.login);
};

export default userRouter;