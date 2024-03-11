import { Router } from 'express';
import {
  getUser, getUsers, updateAvatar, updateProfile,
} from '../controllers/users';

export const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUser);
usersRouter.patch('/me', updateProfile);
usersRouter.patch('/me/avatar', updateAvatar);
