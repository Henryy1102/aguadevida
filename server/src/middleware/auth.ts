import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

type AuthPayload = {
  sub: string;
  role: 'admin' | 'administrativo' | 'bodega' | 'cliente';
  email: string;
};

export type AuthenticatedRequest = Request & {
  user?: AuthPayload;
};

export function authenticate(request: AuthenticatedRequest, response: Response, next: NextFunction): void {
  const authorization = request.headers.authorization;

  if (!authorization?.startsWith('Bearer ')) {
    response.status(401).json({ success: false, message: 'Missing authorization token' });
    return;
  }

  const token = authorization.slice(7);

  try {
    request.user = jwt.verify(token, env.jwtSecret) as AuthPayload;
    next();
  } catch {
    response.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
}

export function authorizeRoles(allowedRoles: Array<AuthPayload['role']>) {
  return (request: AuthenticatedRequest, response: Response, next: NextFunction): void => {
    const role = request.user?.role;

    if (!role || !allowedRoles.includes(role)) {
      response.status(403).json({ success: false, message: 'Insufficient permissions' });
      return;
    }

    next();
  };
}