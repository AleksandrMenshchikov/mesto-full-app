import { Router } from 'express';
import {
  // eslint-disable-next-line import/named
  getUser, getUsers, signout, updateAvatar, updateProfile,
} from '../controllers/users';
import { validateUpdateProfile } from '../validators/validateUpdateProfile';
import { validateUpdateAvatar } from '../validators/validateUpdateAvatar';

export const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.get('/me', getUser);
usersRouter.get('/signout', signout);
usersRouter.patch('/me', validateUpdateProfile(), updateProfile);
usersRouter.patch('/me/avatar', validateUpdateAvatar(), updateAvatar);
