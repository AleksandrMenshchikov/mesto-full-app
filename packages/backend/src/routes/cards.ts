import { Router } from 'express';
import {
  createCard, deleteCard, deleteLike, getCards, putLike,
} from '../controllers/cards';

export const cardsRouter = Router();

cardsRouter.post('/', createCard);
cardsRouter.get('/', getCards);
cardsRouter.delete('/:cardId', deleteCard);
cardsRouter.put('/:cardId/likes', putLike);
cardsRouter.delete('/:cardId/likes', deleteLike);
