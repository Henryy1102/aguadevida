import mongoose from 'mongoose';
import { CategoryModel } from '../../models/Category.js';
import { ProductModel } from '../../models/Product.js';
import type { CategoryCreateInput, CategoryUpdateInput, ProductCreateInput, ProductUpdateInput } from './inventory.schemas.js';

function normalizeCategory(cat: { _id: unknown; name: string; description: string; status: 'active' | 'inactive'; }) {
  return {
    id: String(cat._id),
    name: cat.name,
    description: cat.description,
    status: cat.status
  };
}

function normalizeProduct(prod: { _id: unknown; code: string; name: string; description: string; category: unknown; price: number; stock: number; stockMin: number; image?: string | null; featured: boolean; status: 'active' | 'inactive'; }) {
  return {
    id: String(prod._id),
    code: prod.code,
    name: prod.name,
    description: prod.description,
    category: String(prod.category),
    price: prod.price,
    stock: prod.stock,
    stockMin: prod.stockMin,
    image: prod.image ?? null,
    featured: prod.featured,
    status: prod.status,
    lowStock: prod.stock <= prod.stockMin,
    outOfStock: prod.stock === 0
  };
}

export async function listCategories() {
  const categories = await CategoryModel.find().sort({ createdAt: -1 });
  return categories.map((cat) => normalizeCategory(cat.toObject()));
}

export async function createCategory(input: CategoryCreateInput) {
  const exists = await CategoryModel.findOne({ name: input.name });
  if (exists) throw new Error('Category already exists');

  const created = await CategoryModel.create(input);
  return normalizeCategory(created.toObject());
}

export async function updateCategory(categoryId: string, input: CategoryUpdateInput) {
  const category = await CategoryModel.findByIdAndUpdate(categoryId, input, { new: true });
  if (!category) throw new Error('Category not found');
  return normalizeCategory(category.toObject());
}

export async function deleteCategory(categoryId: string) {
  const category = await CategoryModel.findByIdAndDelete(categoryId);
  if (!category) throw new Error('Category not found');
  return { success: true };
}

export async function listProducts(categoryId?: string) {
  const filter = categoryId ? { category: categoryId } : {};
  const products = await ProductModel.find(filter).populate('category').sort({ createdAt: -1 });
  return products.map((prod) => normalizeProduct(prod.toObject()));
}

async function resolveCategoryId(categoryInput: string) {
  if (mongoose.isValidObjectId(categoryInput)) {
    return categoryInput;
  }

  const normalizedName = categoryInput.trim() || 'General';
  const existingCategory = await CategoryModel.findOne({ name: { $regex: `^${normalizedName}$`, $options: 'i' } });

  if (existingCategory) {
    return String(existingCategory._id);
  }

  const createdCategory = await CategoryModel.create({
    name: normalizedName,
    description: 'Categoría creada automáticamente',
    status: 'active'
  });

  return String(createdCategory._id);
}

export async function createProduct(input: ProductCreateInput) {
  const exists = await ProductModel.findOne({ code: input.code });
  if (exists) throw new Error('Product code already exists');

  const categoryId = await resolveCategoryId(input.category);
  const created = await ProductModel.create({
    ...input,
    category: categoryId
  });

  return normalizeProduct(created.toObject());
}

export async function updateProduct(productId: string, input: ProductUpdateInput) {
  const product = await ProductModel.findByIdAndUpdate(productId, input, { new: true });
  if (!product) throw new Error('Product not found');
  return normalizeProduct(product.toObject());
}

export async function updateProductStock(productId: string, quantity: number, type: 'add' | 'remove') {
  const product = await ProductModel.findById(productId);
  if (!product) throw new Error('Product not found');

  if (type === 'add') {
    product.stock += quantity;
  } else {
    if (product.stock < quantity) throw new Error('Insufficient stock');
    product.stock -= quantity;
  }

  await product.save();
  return normalizeProduct(product.toObject());
}

export async function deleteProduct(productId: string) {
  const product = await ProductModel.findByIdAndDelete(productId);
  if (!product) throw new Error('Product not found');
  return { success: true };
}
