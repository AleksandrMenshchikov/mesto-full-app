import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Unauthorized } from '../errors/unauthorized';
import { IRequest } from '../types/interfaces';
import { TPayload } from '../types/types';
import { JWT } from '../constants';

export function auth(req: Request, _res: Response, next: NextFunction) {
  const { cookie } = req.headers;

  const token = cookie?.split('; ')
    .find((elem) => elem.includes(JWT))
    ?.split('=')[1];

  if (!token) {
    throw new Unauthorized('Необходима авторизация');
  }

  try {
    (req as IRequest).user = jwt.verify(token, process.env.JWT_SECRET as string) as TPayload;
  } catch (err) {
    throw new Unauthorized('Необходима авторизация');
  }

  next();
}
