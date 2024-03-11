import {
  NextFunction, Request, Response,
} from 'express';
import { MESSAGE, responseTexts, statuses } from '../constants';
import { TErr } from '../types/types';

export function handleErrors(err: TErr, _req: Request, res: Response, next: NextFunction) {
  const {
    statusCode = statuses.INTERNAL_SERVER_ERROR,
    message,
  } = err;

  res.status(statusCode)
    .send({ [MESSAGE]: statusCode === statuses.INTERNAL_SERVER_ERROR ? responseTexts['На сервере произошла ошибка'] : message });

  next();
}
