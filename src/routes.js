import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import validatorRecipientStore from './app/validators/RecipientStore';
import validatorSessionStore from './app/validators/SessioStore';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', validatorSessionStore, SessionController.store);

routes.use(authMiddleware);

routes.post('/recipients', validatorRecipientStore, RecipientController.store);

export default routes;
