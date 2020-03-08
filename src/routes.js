import { Router } from 'express';

import DeliverymanController from './app/controllers/DeliverymanController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import validatorDeliverymanStore from './app/validators/DeliverymanStore';
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

routes.post(
  '/deliveryman',
  validatorDeliverymanStore,
  DeliverymanController.store
);

export default routes;
