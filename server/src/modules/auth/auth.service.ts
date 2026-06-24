import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env.js';
import { UserModel } from '../../models/User.js';
import type { ChangePasswordInput, LoginInput, RegisterInput } from './auth.schemas.js';

type SafeUser = {
  id: string;
  firstName: string;
  lastName: string;
  identification: string;
  email: string;
  phone: string;
  address: string;
  role: 'admin' | 'administrativo' | 'bodega' | 'cliente';
  status: 'active' | 'inactive';
  emailVerified: boolean;
};

function toSafeUser(user: { _id: unknown; firstName: string; lastName: string; identification: string; email: string; phone: string; address: string; role: SafeUser['role']; status: SafeUser['status']; emailVerified: boolean; }): SafeUser {
  return {
    id: String(user._id),
    firstName: user.firstName,
    lastName: user.lastName,
    identification: user.identification,
    email: user.email,
    phone: user.phone,
    address: user.address,
    role: user.role,
    status: user.status,
    emailVerified: user.emailVerified
  };
}

function signToken(user: SafeUser): string {
  return jwt.sign({ role: user.role, email: user.email }, env.jwtSecret, { subject: user.id, expiresIn: '7d' });
}

export async function registerUser(input: RegisterInput) {
  const existingUser = await UserModel.findOne({ $or: [{ email: input.email }, { identification: input.identification }] });

  if (existingUser) {
    throw new Error('User already exists');
  }

  const passwordHash = await bcrypt.hash(input.password, 12);

  const createdUser = await UserModel.create({
    ...input,
    email: input.email.toLowerCase(),
    passwordHash
  });

  const safeUser = toSafeUser(createdUser.toObject());

  return {
    user: safeUser,
    token: signToken(safeUser)
  };
}

export async function loginUser(input: LoginInput) {
  const user = await UserModel.findOne({ email: input.email.toLowerCase() });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const passwordMatches = await bcrypt.compare(input.password, user.passwordHash);

  if (!passwordMatches) {
    throw new Error('Invalid credentials');
  }

  const safeUser = toSafeUser(user.toObject());

  return {
    user: safeUser,
    token: signToken(safeUser)
  };
}

export async function changePassword(userId: string, input: ChangePasswordInput) {
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  const passwordMatches = await bcrypt.compare(input.currentPassword, user.passwordHash);

  if (!passwordMatches) {
    throw new Error('Invalid credentials');
  }

  user.passwordHash = await bcrypt.hash(input.newPassword, 12);
  await user.save();

  return { success: true };
}

export async function getAuthProfile(userId: string) {
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  return toSafeUser(user.toObject());
}