import { NextFunction, Request, Response } from 'express';
import { NotFound } from '../errors/notFound';
import { responseTexts } from '../constants';

export function handleNotFound(_req: Request, _res: Response, next: NextFunction) {
  next(new NotFound(responseTexts['Данный маршрут не существует']));
}
