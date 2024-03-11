import { Router } from 'express';
import { usersRouter } from './users';
import { notFoundRouter } from './notFound';
import { cardsRouter } from './cards';

export const router = Router();

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('/*', notFoundRouter);
