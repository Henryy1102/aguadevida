import { Router } from 'express';
import { businessModules, findBusinessModule } from './catalog.js';

export const catalogRouter = Router();

catalogRouter.get('/', (_request, response) => {
  response.json({
    success: true,
    modules: businessModules
  });
});

catalogRouter.get('/:moduleId', (request, response) => {
  const businessModule = findBusinessModule(request.params.moduleId);

  if (!businessModule) {
    response.status(404).json({
      success: false,
      message: 'Module not found'
    });

    return;
  }

  response.json({
    success: true,
    module: businessModule
  });
});