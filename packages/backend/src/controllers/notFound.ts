import { NextFunction, Request, Response } from 'express';
import { NotFound } from '../errors/notFound';

export function handleNotFound(_req: Request, _res: Response, next: NextFunction) {
  next(new NotFound('Данный маршрут не существует'));
}
