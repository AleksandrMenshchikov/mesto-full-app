import { NextFunction, Request, Response } from 'express';
import {
  DATA, responseTexts, statuses,
} from '../constants';
import { Card } from '../models/card';
import { IRequest } from '../types/interfaces';
import { TCard } from '../types/types';
import { NotFound } from '../errors/notFound';
import { Forbidden } from '../errors/forbidden';

export async function createCard(req: Request, res: Response, next: NextFunction) {
  try {
    const {
      name,
      link,
    }: TCard = req.body;

    const owner = (req as IRequest).user._id;

    const data = await Card.create({
      name,
      link,
      owner,
    });

    res.status(statuses.CREATED)
      .send({ [DATA]: data });
  } catch (err) {
    next(err);
  }
}

export async function getCards(_req: Request, res: Response, next: NextFunction) {
  try {
    const data = await Card.find();
    res.status(statuses.OK)
      .send({ [DATA]: data });
  } catch (err) {
    next(err);
  }
}

export async function deleteCard(req: Request, res: Response, next: NextFunction) {
  try {
    const { cardId } = req.params;
    const data = await Card.findById(cardId);

    if (!data) {
      throw new NotFound(responseTexts['Карточка с указанным _id не найдена']);
    } else if (data.owner.toString() !== (req as IRequest).user._id as unknown as string) {
      throw new Forbidden(responseTexts['Попытка удалить чужую карточку']);
    } else {
      await Card.findByIdAndDelete(cardId);

      res.status(statuses.OK)
        .send({ [DATA]: data });
    }
  } catch (err) {
    next(err);
  }
}

export async function putLike(req: Request, res: Response, next: NextFunction) {
  try {
    const { cardId } = req.params;
    const { _id: userId } = (req as IRequest).user;

    const data = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!data) {
      throw new NotFound(responseTexts['Передан несуществующий _id карточки']);
    } else {
      res.status(statuses.OK)
        .send({ [DATA]: data });
    }
  } catch (err) {
    next(err);
  }
}

export async function deleteLike(req: Request, res: Response, next: NextFunction) {
  try {
    const { cardId } = req.params;
    const { _id: userId } = (req as IRequest).user;

    const data = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!data) {
      throw new NotFound(responseTexts['Передан несуществующий _id карточки']);
    } else {
      res.status(statuses.OK)
        .send({ [DATA]: data });
    }
  } catch (err) {
    next(err);
  }
}
