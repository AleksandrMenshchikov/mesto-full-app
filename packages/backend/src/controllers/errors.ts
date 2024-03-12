import {
  NextFunction, Request, Response,
} from 'express';
import mongoose from 'mongoose';
import { MESSAGE, responseTexts, statuses } from '../constants';

export function handleErrors(err: any, _req: Request, res: Response, next: NextFunction) {
  if (err instanceof mongoose.Error) {
    res.status(statuses.BAD_REQUEST)
      .send({ [MESSAGE]: err.message });
  } else if (err.code === 11000) {
    if (err.keyPattern.email) {
      res.status(statuses.CONFLICT)
        .send({ [MESSAGE]: err.message });
    } else {
      res.status(statuses.BAD_REQUEST)
        .send({ [MESSAGE]: err.message });
    }
  } else if (err.statusCode !== statuses.INTERNAL_SERVER_ERROR) {
    res.status(err.statusCode)
      .send({ [MESSAGE]: err.message });
  } else {
    res.status(statuses.INTERNAL_SERVER_ERROR)
      .send({ [MESSAGE]: responseTexts['На сервере произошла ошибка'] });
  }

  next();
}
