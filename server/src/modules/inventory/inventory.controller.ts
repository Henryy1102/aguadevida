import type { Request, Response } from 'express';
import { categoryCreateSchema, categoryUpdateSchema, productCreateSchema, productUpdateSchema } from './inventory.schemas.js';
import {
  createCategory,
  createProduct,
  deleteCategory,
  deleteProduct,
  listCategories,
  listProducts,
  updateCategory,
  updateProduct,
  updateProductStock
} from './inventory.service.js';

type CategoryParams = { categoryId: string };
type ProductParams = { productId: string };

export async function getCategories(_request: Request, response: Response): Promise<void> {
  const categories = await listCategories();
  response.json({ success: true, categories });
}

export async function postCategory(request: Request, response: Response): Promise<void> {
  try {
    const input = categoryCreateSchema.parse(request.body);
    const category = await createCategory(input);
    response.status(201).json({ success: true, category });
  } catch (error) {
    response.status(400).json({ success: false, message: error instanceof Error ? error.message : 'Failed to create category' });
  }
}

export async function patchCategory(request: Request<CategoryParams>, response: Response): Promise<void> {
  try {
    const input = categoryUpdateSchema.parse(request.body);
    const category = await updateCategory(request.params.categoryId, input);
    response.json({ success: true, category });
  } catch (error) {
    response.status(400).json({ success: false, message: error instanceof Error ? error.message : 'Failed to update category' });
  }
}

export async function deleteCategories(request: Request<CategoryParams>, response: Response): Promise<void> {
  try {
    await deleteCategory(request.params.categoryId);
    response.json({ success: true });
  } catch (error) {
    response.status(400).json({ success: false, message: error instanceof Error ? error.message : 'Failed to delete category' });
  }
}

export async function getProducts(request: Request, response: Response): Promise<void> {
  const categoryId = request.query.category as string | undefined;
  const products = await listProducts(categoryId);
  response.json({ success: true, products });
}

export async function postProduct(request: Request, response: Response): Promise<void> {
  try {
    const input = productCreateSchema.parse(request.body);
    const product = await createProduct(input);
    response.status(201).json({ success: true, product });
  } catch (error) {
    response.status(400).json({ success: false, message: error instanceof Error ? error.message : 'Failed to create product' });
  }
}

export async function patchProduct(request: Request<ProductParams>, response: Response): Promise<void> {
  try {
    const input = productUpdateSchema.parse(request.body);
    const product = await updateProduct(request.params.productId, input);
    response.json({ success: true, product });
  } catch (error) {
    response.status(400).json({ success: false, message: error instanceof Error ? error.message : 'Failed to update product' });
  }
}

export async function patchProductStock(request: Request<ProductParams>, response: Response): Promise<void> {
  try {
    const { quantity, type } = request.body as { quantity: number; type: 'add' | 'remove' };

    if (!quantity || !['add', 'remove'].includes(type)) {
      response.status(400).json({ success: false, message: 'Invalid quantity or type' });
      return;
    }

    const product = await updateProductStock(request.params.productId, quantity, type);
    response.json({ success: true, product });
  } catch (error) {
    response.status(400).json({ success: false, message: error instanceof Error ? error.message : 'Failed to update stock' });
  }
}

export async function deleteProducts(request: Request<ProductParams>, response: Response): Promise<void> {
  try {
    await deleteProduct(request.params.productId);
    response.json({ success: true });
  } catch (error) {
    response.status(400).json({ success: false, message: error instanceof Error ? error.message : 'Failed to delete product' });
  }
}
