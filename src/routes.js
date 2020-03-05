import { Router } from 'express';

import RecipientController from './app/controllers/RecipientsController';
import SessionController from './app/controllers/SessionController';

import validateSessionStore from './app/validators/SessionStore';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', validateSessionStore, SessionController.store);

routes.use(authMiddleware);

routes.post('/recipients', RecipientController.store);

export default routes;
