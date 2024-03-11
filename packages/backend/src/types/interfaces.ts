import { Request } from 'express';
import { TPayload } from './types';

export interface IRequest extends Request {
  user: TPayload;
}
