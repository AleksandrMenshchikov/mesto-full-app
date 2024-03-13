import { celebrate } from 'celebrate';
import Joi from 'joi';

export function validateLogin() {
  return celebrate({
    body: Joi.object()
      .keys({
        email: Joi.string()
          .required()
          .email(),
        password: Joi.string()
          .required()
          .min(6),
      }),
  });
}
