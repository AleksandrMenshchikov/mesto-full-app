import { celebrate } from 'celebrate';
import Joi from 'joi';

export function validateGetUser() {
  return celebrate({
    params: Joi.object()
      .keys({
        userId: Joi.string()
          .required()
          .length(24)
          .hex(),
      }),
  });
}
