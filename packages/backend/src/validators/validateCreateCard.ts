import { celebrate } from 'celebrate';
import Joi from 'joi';

export function validateCreateCard() {
  return celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string()
          .required()
          .min(2)
          .max(30),
        link: Joi.string()
          .required()
          .uri(),
      }),
  });
}
