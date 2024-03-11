import { Router } from 'express';
import {
  createUser, getUser, getUsers, updateAvatar, updateProfile,
} from '../controllers/users';

export const usersRouter = Router();

usersRouter.post('/', createUser);
usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUser);
usersRouter.patch('/me', updateProfile);
usersRouter.patch('/me/avatar', updateAvatar);
