import { z } from 'zod';

export const categoryCreateSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(5),
  status: z.enum(['active', 'inactive']).default('active')
});

export const categoryUpdateSchema = categoryCreateSchema.partial();

export const productCreateSchema = z.object({
  code: z.string().min(2),
  name: z.string().min(2),
  description: z.string().trim().min(1),
  category: z.string().min(1),
  price: z.number().positive(),
  stock: z.number().int().min(0),
  stockMin: z.number().int().min(0),
  image: z.string().nullable().default(null),
  featured: z.boolean().default(false),
  status: z.enum(['active', 'inactive']).default('active')
});

export const productUpdateSchema = productCreateSchema.partial();

export type CategoryCreateInput = z.infer<typeof categoryCreateSchema>;
export type CategoryUpdateInput = z.infer<typeof categoryUpdateSchema>;
export type ProductCreateInput = z.infer<typeof productCreateSchema>;
export type ProductUpdateInput = z.infer<typeof productUpdateSchema>;
