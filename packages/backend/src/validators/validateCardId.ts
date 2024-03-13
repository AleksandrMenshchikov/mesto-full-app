import { celebrate } from 'celebrate';
import Joi from 'joi';

export function validateCardId() {
  return celebrate({
    params: Joi.object()
      .keys({
        cardId: Joi.string()
          .required()
          .hex()
          .length(24),
      }),
  });
}
