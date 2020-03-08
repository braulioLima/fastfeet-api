import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import DeliverymanController from './app/controllers/DeliverymanController';
import FileController from './app/controllers/FileController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';

import validatorDeliverymanStore from './app/validators/DeliverymanStore';
import validatorDeliverymanUpdate from './app/validators/DeliverymanUpdate';
import validatorRecipientStore from './app/validators/RecipientStore';
import validatorRecipientUpdate from './app/validators/RecipientUpdate';
import validatorSessionStore from './app/validators/SessionStore';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', validatorSessionStore, SessionController.store);

routes.use(authMiddleware);

routes.post('/recipients', validatorRecipientStore, RecipientController.store);
routes.put(
  '/recipients/:recipientId',
  validatorRecipientUpdate,
  RecipientController.update
);

routes.get('/deliveryman', DeliverymanController.index);
routes.post(
  '/deliveryman',
  validatorDeliverymanStore,
  DeliverymanController.store
);
routes.delete('/deliveryman/:deliverymanId', DeliverymanController.delete);
routes.put(
  '/deliveryman/:deliverymanId',
  validatorDeliverymanUpdate,
  DeliverymanController.update
);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
