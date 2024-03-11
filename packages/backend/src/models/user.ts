import { Schema, model } from 'mongoose';
import { isURL } from 'validator';
import { TUser } from '../types/types';

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: [true, 'Поле "name" обязательное для заполнения'],
      minlength: [2, 'Поле "name" должно быть больше 1 символа'],
      maxlength: [30, 'Поле "name" должно быть меньше 31 символа'],
    },
    about: {
      type: String,
      required: [true, 'Поле "about" обязательное для заполнения'],
      minlength: [2, 'Поле "about" должно быть больше 1 символа'],
      maxlength: [200, 'Поле "about" должно быть меньше 201 символа'],
    },
    avatar: {
      type: String,
      required: [true, 'Поле "avatar" обязательное для заполнения'],
      validate: {
        validator: (v: string) => isURL(v),
        message: 'Поле "avatar" не соответствует формату url',
      },
    },
  },
  { versionKey: false },
);

export const User = model<TUser>('user', userSchema, 'users');
