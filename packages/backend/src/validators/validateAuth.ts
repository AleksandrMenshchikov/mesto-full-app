import { celebrate } from 'celebrate';
import Joi from 'joi';

export function validateAuth() {
  return celebrate({
    headers: Joi.object()
      .keys({
        cookie: Joi.string()
          .required()
          .pattern(/^.*?jwt.*?$/),
      })
      .unknown(),
  });
}
