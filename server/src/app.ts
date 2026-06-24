import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { authRouter } from './modules/auth/auth.routes.js';
import { catalogRouter } from './modules/catalog.routes.js';
import { healthRouter } from './modules/health/routes/health.routes.js';
import { inventoryRouter } from './modules/inventory/inventory.routes.js';
import { usersRouter } from './modules/users/users.routes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { env } from './config/env.js';

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: env.clientUrl, credentials: true }));
  app.use(express.json({ limit: '1mb' }));
  app.use(morgan('dev'));

  app.get('/', (_request, response) => {
    response.json({ success: true, message: 'Agua de Vida API' });
  });

  app.use('/api/health', healthRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/inventory', inventoryRouter);
  app.use('/api/modules', catalogRouter);
  app.use(errorHandler);

  return app;
}
