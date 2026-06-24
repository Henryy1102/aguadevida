import type { Request, Response } from 'express';
import { userCreateSchema, userUpdateSchema } from './users.schemas.js';
import { createUser, deleteUser, listUsers, toggleUserStatus, updateUser } from './users.service.js';

type UserParams = {
  userId: string;
};

export async function getUsers(_request: Request, response: Response): Promise<void> {
  const users = await listUsers();
  response.json({ success: true, users });
}

export async function postUser(request: Request, response: Response): Promise<void> {
  try {
    const input = userCreateSchema.parse(request.body);
    const user = await createUser(input);

    response.status(201).json({ success: true, user });
  } catch (error) {
    response.status(400).json({ success: false, message: error instanceof Error ? error.message : 'User creation failed' });
  }
}

export async function patchUser(request: Request<UserParams>, response: Response): Promise<void> {
  try {
    const input = userUpdateSchema.parse(request.body);
    const user = await updateUser(request.params.userId, input);

    response.json({ success: true, user });
  } catch (error) {
    response.status(400).json({ success: false, message: error instanceof Error ? error.message : 'User update failed' });
  }
}

export async function patchUserStatus(request: Request<UserParams>, response: Response): Promise<void> {
  try {
    const status = request.body.status as 'active' | 'inactive';

    if (!['active', 'inactive'].includes(status)) {
      response.status(400).json({ success: false, message: 'Invalid status' });
      return;
    }

    const user = await toggleUserStatus(request.params.userId, status);
    response.json({ success: true, user });
  } catch (error) {
    response.status(400).json({ success: false, message: error instanceof Error ? error.message : 'Status update failed' });
  }
}

export async function removeUser(request: Request<UserParams>, response: Response): Promise<void> {
  try {
    await deleteUser(request.params.userId);
    response.json({ success: true });
  } catch (error) {
    response.status(400).json({ success: false, message: error instanceof Error ? error.message : 'User deletion failed' });
  }
}