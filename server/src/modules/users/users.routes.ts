import { Router } from 'express';
import { authenticate, authorizeRoles } from '../../middleware/auth.js';
import { getUsers, patchUser, patchUserStatus, postUser, removeUser } from './users.controller.js';

export const usersRouter = Router();

usersRouter.use(authenticate);
usersRouter.use(authorizeRoles(['admin']));

usersRouter.get('/', getUsers);
usersRouter.post('/', postUser);
usersRouter.patch('/:userId', patchUser);
usersRouter.patch('/:userId/status', patchUserStatus);
usersRouter.delete('/:userId', removeUser);