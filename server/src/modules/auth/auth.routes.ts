import { Router } from 'express';
import { authenticate } from '../../middleware/auth.js';
import { login, profile, register, updatePassword } from './auth.controller.js';

export const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/me', authenticate, profile);
authRouter.patch('/password', authenticate, updatePassword);