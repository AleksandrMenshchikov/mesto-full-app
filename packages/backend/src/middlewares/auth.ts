import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as process from 'process';
import { Unauthorized } from '../errors/unauthorized';
import { IRequest } from '../types/interfaces';
import { TPayload } from '../types/types';

export function auth(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Unauthorized('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, process.env.JWT_SECRET as string) as TPayload;
    (req as IRequest).user = payload;
  } catch (err) {
    throw new Unauthorized('Необходима авторизация');
  }

  next();
}
