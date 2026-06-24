import { z } from 'zod';

export const registerSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  identification: z.string().min(5),
  email: z.string().email(),
  phone: z.string().min(7),
  address: z.string().min(5),
  password: z.string().min(8),
  role: z.enum(['admin', 'administrativo', 'bodega', 'cliente']).default('cliente')
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(8),
  newPassword: z.string().min(8)
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;