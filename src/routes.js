import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import validatorSessionStore from './app/validators/SessioStore';
import RecipientController from './app/controllers/RecipientController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', validatorSessionStore, SessionController.store);

routes.use(authMiddleware);

routes.post('/recipients', RecipientController.store);

export default routes;
