import type { Request, Response } from 'express';

export function getHealth(_request: Request, response: Response): void {
  response.json({
    success: true,
    message: 'Agua de Vida API is running',
    timestamp: new Date().toISOString()
  });
}
