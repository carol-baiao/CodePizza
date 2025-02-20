import { Router } from 'express';
import multer from 'multer';

// controllers - user
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';

//controllers - category
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';

// controllers - products
import { CreateProductController } from './controllers/product/CreateProductController';

// middlewares
import { isAuthenticated } from './middlewares/isAuthenticated';
import uploadConfig from './config/multer';


const router = Router();
const upload = multer(uploadConfig.upload("./tmp"));

// Rotas - user
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/userinfo', isAuthenticated, new DetailUserController().handle);

// Rotas - categories
router.post('/category', isAuthenticated, new CreateCategoryController().handle);
router.get('/category', isAuthenticated, new ListCategoryController().handle);

// Rotas - product
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle);

export { router };