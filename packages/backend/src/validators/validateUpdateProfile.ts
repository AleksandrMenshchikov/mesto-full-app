import { celebrate } from 'celebrate';
import Joi from 'joi';

export function validateUpdateProfile() {
  return celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string()
          .required()
          .min(2)
          .max(30),
        about: Joi.string()
          .required()
          .min(2)
          .max(200),
      }),
  });
}
