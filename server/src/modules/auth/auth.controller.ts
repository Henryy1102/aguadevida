import type { Request, Response } from 'express';
import { changePasswordSchema, loginSchema, registerSchema } from './auth.schemas.js';
import { changePassword, getAuthProfile, loginUser, registerUser } from './auth.service.js';
import type { AuthenticatedRequest } from '../../middleware/auth.js';

export async function register(request: Request, response: Response): Promise<void> {
  try {
    const input = registerSchema.parse(request.body);
    const result = await registerUser(input);

    response.status(201).json({ success: true, ...result });
  } catch (error) {
    response.status(400).json({ success: false, message: error instanceof Error ? error.message : 'Registration failed' });
  }
}

export async function login(request: Request, response: Response): Promise<void> {
  try {
    const input = loginSchema.parse(request.body);
    const result = await loginUser(input);

    response.json({ success: true, ...result });
  } catch (error) {
    response.status(400).json({ success: false, message: error instanceof Error ? error.message : 'Login failed' });
  }
}

export async function profile(request: AuthenticatedRequest, response: Response): Promise<void> {
  try {
    const userId = request.user?.sub;

    if (!userId) {
      response.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const user = await getAuthProfile(userId);
    response.json({ success: true, user });
  } catch (error) {
    response.status(404).json({ success: false, message: error instanceof Error ? error.message : 'Profile not found' });
  }
}

export async function updatePassword(request: AuthenticatedRequest, response: Response): Promise<void> {
  try {
    const userId = request.user?.sub;

    if (!userId) {
      response.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const input = changePasswordSchema.parse(request.body);
    await changePassword(userId, input);

    response.json({ success: true, message: 'Password updated' });
  } catch (error) {
    response.status(400).json({ success: false, message: error instanceof Error ? error.message : 'Password update failed' });
  }
}