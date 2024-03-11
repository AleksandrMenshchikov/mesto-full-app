import {
  NextFunction, Request, Response,
} from 'express';
import { MESSAGE } from '../constants';
import { TErr } from '../types/types';

export function handleErrors(err: TErr, _req: Request, res: Response, next: NextFunction) {
  const {
    statusCode = 500,
    message,
  } = err;

  res.status(statusCode)
    .send({ [MESSAGE]: statusCode === 500 ? 'Произошла внутренняя ошибка сервера' : message });

  next();
}
