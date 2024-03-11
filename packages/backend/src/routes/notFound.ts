import { Router } from 'express';
import { handleNotFound } from '../controllers/notFound';

export const notFoundRouter = Router();

notFoundRouter.all('/', handleNotFound);
