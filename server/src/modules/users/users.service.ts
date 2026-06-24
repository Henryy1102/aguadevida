import bcrypt from 'bcryptjs';
import { UserModel } from '../../models/User.js';
import type { UserCreateInput, UserUpdateInput } from './users.schemas.js';

function normalizeUser(user: { _id: unknown; firstName: string; lastName: string; identification: string; email: string; phone: string; address: string; role: 'admin' | 'administrativo' | 'bodega' | 'cliente'; status: 'active' | 'inactive'; emailVerified: boolean; }) {
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

export async function listUsers() {
  const users = await UserModel.find().sort({ createdAt: -1 });
  return users.map((user) => normalizeUser(user.toObject()));
}

export async function createUser(input: UserCreateInput) {
  const exists = await UserModel.findOne({ $or: [{ email: input.email }, { identification: input.identification }] });

  if (exists) {
    throw new Error('User already exists');
  }

  const passwordHash = await bcrypt.hash(input.password, 12);

  const created = await UserModel.create({
    ...input,
    email: input.email.toLowerCase(),
    passwordHash
  });

  return normalizeUser(created.toObject());
}

export async function updateUser(userId: string, input: UserUpdateInput) {
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  if (input.email) user.email = input.email.toLowerCase();
  if (input.firstName) user.firstName = input.firstName;
  if (input.lastName) user.lastName = input.lastName;
  if (input.identification) user.identification = input.identification;
  if (input.phone) user.phone = input.phone;
  if (input.address) user.address = input.address;
  if (input.role) user.role = input.role;
  if (input.status) user.status = input.status;
  if (input.password) user.passwordHash = await bcrypt.hash(input.password, 12);

  await user.save();
  return normalizeUser(user.toObject());
}

export async function toggleUserStatus(userId: string, status: 'active' | 'inactive') {
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  user.status = status;
  await user.save();

  return normalizeUser(user.toObject());
}

export async function deleteUser(userId: string) {
  const deleted = await UserModel.findByIdAndDelete(userId);

  if (!deleted) {
    throw new Error('User not found');
  }

  return { success: true };
}