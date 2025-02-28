import { Router } from 'express';
import multer from 'multer';

// controllers - user
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';

//controllers - category
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';

// controllers - product
import { CreateProductController } from './controllers/product/CreateProductController';
import { ListByCategoryController } from './controllers/product/ListByCategoryController';

// controllers - order
import { CreateOrderController } from './controllers/order/CreateOrderController';
import { RemoveOrderController } from './controllers/order/RemoveOrderController';
import { SendOrderController } from './controllers/order/SendOrderController';
import { ListSentOrdersController } from './controllers/order/ListSentOrdersController';
import { DetailOrderController } from './controllers/order/DetailOrderController';
import { FinishOrderController } from './controllers/order/FinishOrderController';

// controllers - item
import { AddItemController } from './controllers/item/AddItemController';
import { RemoveItemController } from './controllers/item/RemoveItemController';

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
router.get('/category/products', isAuthenticated, new ListByCategoryController().handle);

// Rotas - Order
router.post('/order', isAuthenticated, new CreateOrderController().handle);
router.delete('/order', isAuthenticated, new RemoveOrderController().handle);
router.put('/order/send', isAuthenticated, new SendOrderController().handle);
router.get('/orders', isAuthenticated, new ListSentOrdersController().handle);
router.get('/order/detail', isAuthenticated, new DetailOrderController().handle);
router.put('/order/finish', isAuthenticated, new FinishOrderController().handle);

// Rotas - Item
router.post('/order/item', isAuthenticated, new AddItemController().handle);
router.delete('/order/item', isAuthenticated, new RemoveItemController().handle);


export { router };