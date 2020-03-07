import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import validatorRecipientStore from './app/validators/RecipientStore';
import validatorRecipientUpdate from './app/validators/RecipientUpdate';
import validatorSessionStore from './app/validators/SessionStore';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', validatorSessionStore, SessionController.store);

routes.use(authMiddleware);

routes.post('/recipients', validatorRecipientStore, RecipientController.store);
routes.put(
  '/recipients/:recipientId',
  validatorRecipientUpdate,
  RecipientController.update
);

export default routes;
