import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { User } from '../models/user';
import {
  DATA, MESSAGE, responseTexts, statuses,
} from '../constants';
import { NotFound } from '../errors/notFound';
import { TUser } from '../types/types';
import { IRequest } from '../types/interfaces';
import { BadRequest } from '../errors/badRequest';

export async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const {
      name,
      about,
      avatar,
    }: TUser = req.body;

    if (!name || !about || !avatar) {
      throw new BadRequest(responseTexts['Переданы некорректные данные при создании пользователя']);
    }

    const data = await User.create({
      name,
      about,
      avatar,
    });

    res.status(statuses.CREATED)
      .send({ [DATA]: data });
  } catch (err) {
    if (err instanceof mongoose.Error) {
      res.status(statuses.BAD_REQUEST)
        .send({ [MESSAGE]: err.message });
    } else {
      next(err);
    }
  }
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = req.params;
    const data = await User.findById(userId);

    if (!data) {
      throw new NotFound(responseTexts['Пользователь по указанному _id не найден']);
    } else {
      res.status(statuses.OK)
        .send({ [DATA]: data });
    }
  } catch (err) {
    if (err instanceof mongoose.Error) {
      res.status(statuses.BAD_REQUEST)
        .send({ [MESSAGE]: err.message });
    } else {
      next(err);
    }
  }
}

export async function getUsers(_req: Request, res: Response, next: NextFunction) {
  try {
    const data = await User.find();
    res.status(statuses.OK)
      .send({ [DATA]: data });
  } catch (err) {
    next(err);
  }
}

export async function updateProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const { _id: userId } = (req as IRequest).user;
    const {
      name,
      about,
    }: TUser = req.body;

    if (!name || !about) {
      throw new BadRequest(responseTexts['Переданы некорректные данные при обновлении профиля']);
    }

    const data = await User.findByIdAndUpdate(userId, {
      name,
      about,
    }, {
      new: true,
      runValidators: true,
    });

    if (!data) {
      throw new NotFound(responseTexts['Пользователь по указанному _id не найден']);
    } else {
      res.status(statuses.OK)
        .send({ [DATA]: data });
    }
  } catch (err) {
    if (err instanceof mongoose.Error) {
      res.status(statuses.BAD_REQUEST)
        .send({ [MESSAGE]: err.message });
    } else {
      next(err);
    }
  }
}

export async function updateAvatar(req: Request, res: Response, next: NextFunction) {
  try {
    const {
      avatar,
    }: TUser = req.body;

    if (!avatar) {
      throw new BadRequest(responseTexts['Переданы некорректные данные при обновлении аватара']);
    }

    const { _id: userId } = (req as IRequest).user;

    const data = await User.findByIdAndUpdate(userId, {
      avatar,
    }, {
      new: true,
      runValidators: true,
    });

    if (!data) {
      throw new NotFound(responseTexts['Пользователь по указанному _id не найден']);
    } else {
      res.status(statuses.OK)
        .send({ [DATA]: data });
    }
  } catch (err) {
    if (err instanceof mongoose.Error) {
      res.status(statuses.BAD_REQUEST)
        .send({ [MESSAGE]: err.message });
    } else {
      next(err);
    }
  }
}
