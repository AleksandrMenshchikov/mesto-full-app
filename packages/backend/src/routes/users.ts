import { Router } from 'express';
import {
  getUser, getUsers, updateAvatar, updateProfile,
} from '../controllers/users';
import { validateUpdateProfile } from '../validators/validateUpdateProfile';
import { validateUpdateAvatar } from '../validators/validateUpdateAvatar';
import { validateGetUser } from '../validators/validateGetUser';

export const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', validateGetUser(), getUser);
usersRouter.patch('/me', validateUpdateProfile(), updateProfile);
usersRouter.patch('/me/avatar', validateUpdateAvatar(), updateAvatar);
