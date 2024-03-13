import { celebrate } from 'celebrate';
import Joi from 'joi';

export function validateUpdateAvatar() {
  return celebrate({
    body: Joi.object()
      .keys({
        avatar: Joi.string()
          .required()
          .uri(),
      }),
  });
}
