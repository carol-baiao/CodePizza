import { Router } from 'express';

// controllers
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';

// middlewares
import { isAuthenticated } from './middlewares/isAuthenticated';


const router = Router();

// Rotas - user
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/userinfo', isAuthenticated, new DetailUserController().handle);

export { router };