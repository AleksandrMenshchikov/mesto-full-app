import { celebrate } from 'celebrate';
import Joi from 'joi';

export function validateCreateUser() {
  return celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string()
          .min(2)
          .max(30),
        about: Joi.string()
          .min(2)
          .max(200),
        avatar: Joi.string()
          .uri(),
        email: Joi.string()
          .required()
          .email(),
        password: Joi.string()
          .required()
          .min(6),
      }),
  });
}
