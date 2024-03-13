import { Router } from 'express';
import {
  createCard, deleteCard, deleteLike, getCards, putLike,
} from '../controllers/cards';
import { validateCreateCard } from '../validators/validateCreateCard';
import { validateCardId } from '../validators/validateCardId';

export const cardsRouter = Router();

cardsRouter.post('/', validateCreateCard(), createCard);
cardsRouter.get('/', getCards);
cardsRouter.delete('/:cardId', validateCardId(), deleteCard);
cardsRouter.put('/:cardId/likes', validateCardId(), putLike);
cardsRouter.delete('/:cardId/likes', validateCardId(), deleteLike);
