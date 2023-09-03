import { PrismaClient } from '@prisma/client';
import httpStatus from 'http-status';
import jwt, { Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { ILoginUser, ILoginUserResponse, IUser } from './user.interface';

const prisma = new PrismaClient();

const createUser = async (user: IUser): Promise<IUser | null> => {
  const createdUser = await prisma.user.create({
    data: user,
  });

  // Explicitly cast the result to IUser or return null if it's null
  const newUser: IUser | null = createdUser as IUser | null;

  return newUser;
};

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  // Find the user using Prisma
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, role: true, password: true },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // Verify the password

  if (user.password !== password) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  // Create an access token
  const { id, role } = user;
  const accessToken = jwt.sign({ id, role }, config.jwt.secret as Secret, {
    expiresIn: config.jwt.expires_in,
  });

  return { accessToken };
};

const getAllUsers = async (): Promise<IUser[]> => {
  const allUsers = await prisma.user.findMany();

  return allUsers;
};

export const UserService = {
  createUser,
  loginUser,
  getAllUsers,
};
