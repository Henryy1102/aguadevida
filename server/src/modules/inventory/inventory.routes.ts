import { Router } from 'express';
import { authenticate, authorizeRoles } from '../../middleware/auth.js';
import {
  deleteCategories,
  deleteProducts,
  getCategories,
  getProducts,
  patchCategory,
  patchProduct,
  patchProductStock,
  postCategory,
  postProduct
} from './inventory.controller.js';

export const inventoryRouter = Router();

inventoryRouter.get('/categories', getCategories);
inventoryRouter.post('/categories', authenticate, authorizeRoles(['admin', 'administrativo']), postCategory);
inventoryRouter.patch('/categories/:categoryId', authenticate, authorizeRoles(['admin', 'administrativo']), patchCategory);
inventoryRouter.delete('/categories/:categoryId', authenticate, authorizeRoles(['admin']), deleteCategories);

inventoryRouter.get('/products', getProducts);
inventoryRouter.post('/products', authenticate, authorizeRoles(['admin', 'administrativo']), postProduct);
inventoryRouter.patch('/products/:productId', authenticate, authorizeRoles(['admin', 'administrativo']), patchProduct);
inventoryRouter.patch('/products/:productId/stock', authenticate, authorizeRoles(['admin', 'bodega']), patchProductStock);
inventoryRouter.delete('/products/:productId', authenticate, authorizeRoles(['admin']), deleteProducts);
