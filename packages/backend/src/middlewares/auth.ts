import { NextFunction, Request, Response } from 'express';
import { Schema } from 'mongoose';
import { IRequest } from '../types/interfaces';

export function temporaryAuth(req: Request, _res: Response, next: NextFunction) {
  (req as IRequest).user = {
    _id: '65eaa30dceb78667780ce1d4' as unknown as Schema.Types.ObjectId,
  };

  next();
}
