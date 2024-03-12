import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import {
  DATA, responseTexts, statuses,
} from '../constants';
import { NotFound } from '../errors/notFound';
import { TUser } from '../types/types';
import { IRequest } from '../types/interfaces';
import { BadRequest } from '../errors/badRequest';
import { Unauthorized } from '../errors/unauthorized';
import { Conflict } from '../errors/conflict';

export async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const {
      name,
      about,
      avatar,
      email,
      password,
    }: TUser = req.body;

    if (!email || !password) {
      throw new BadRequest(responseTexts['Переданы некорректные данные при создании пользователя']);
    } else if (password && password.length < 6) {
      throw new BadRequest(responseTexts['Поле "password" должно быть больше 5 символов']);
    }

    const response = await User.findOne({ email });

    if (response) {
      throw new Conflict('При регистрации указан email, который уже существует на сервере');
    }

    const hash = await bcrypt.hash(password, 10);

    const data = await User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    });

    const {
      password: p,
      ...rest
    } = data.toJSON();

    const token = jwt.sign(
      { _id: data._id },
      process.env.JWT_SECRET as string,
    );

    res
      .cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7, // 1 час * 24 * 7
        httpOnly: true,
        sameSite: true,
      })
      .status(statuses.CREATED)
      .send({ [DATA]: rest });
  } catch (err) {
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const {
      email,
      password,
    }: TUser = req.body;

    if (!email || !password) {
      throw new BadRequest(responseTexts['Переданы некорректные данные при авторизации']);
    } else if (password && password.length < 6) {
      throw new BadRequest(responseTexts['Поле "password" должно быть больше 5 символов']);
    }

    const data = await User.findOne({ email })
      .select('+password');

    if (!data) {
      throw new Unauthorized(responseTexts['Передан неверный логин']);
    } else {
      const matched = await bcrypt.compare(password, data.password);

      if (matched) {
        const {
          password: p,
          ...rest
        } = data.toJSON();

        const token = jwt.sign(
          { _id: data._id },
          process.env.JWT_SECRET as string,
        );

        res
          .cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7, // 1 час * 24 * 7
            httpOnly: true,
            sameSite: true,
          })
          .status(statuses.OK)
          .send({ [DATA]: rest });
      } else {
        throw new Unauthorized(responseTexts['Передан неверный пароль']);
      }
    }
  } catch (err) {
    next(err);
  }
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await User.findById((req as IRequest).user._id);

    if (!data) {
      throw new NotFound(responseTexts['Пользователь по указанному _id не найден']);
    } else {
      res.status(statuses.OK)
        .send({ [DATA]: data });
    }
  } catch (err) {
    next(err);
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
    const { _id } = (req as IRequest).user;
    const {
      name,
      about,
    }: TUser = req.body;

    if (!name || !about) {
      throw new BadRequest(responseTexts['Переданы некорректные данные при обновлении профиля']);
    }

    const data = await User.findByIdAndUpdate(_id, {
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
    next(err);
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

    const { _id } = (req as IRequest).user;

    const data = await User.findByIdAndUpdate(_id, {
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
    next(err);
  }
}
