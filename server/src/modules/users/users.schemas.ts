import { z } from 'zod';

export const userCreateSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  identification: z.string().min(5),
  email: z.string().email(),
  phone: z.string().min(7),
  address: z.string().min(5),
  password: z.string().min(8),
  role: z.enum(['admin', 'administrativo', 'bodega', 'cliente']),
  status: z.enum(['active', 'inactive']).default('active')
});

export const userUpdateSchema = userCreateSchema.partial().extend({
  password: z.string().min(8).optional()
});

export type UserCreateInput = z.infer<typeof userCreateSchema>;
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;