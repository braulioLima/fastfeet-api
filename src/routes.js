import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import validatorSessionStore from './app/validators/SessioStore';

const routes = new Router();

routes.post('/sessions', validatorSessionStore, SessionController.store);

export default routes;
