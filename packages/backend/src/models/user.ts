import { Schema, model } from 'mongoose';
import { isEmail, isURL } from 'validator';
import { TUser } from '../types/types';

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      minlength: [2, 'Поле "name" должно быть больше 1 символа'],
      maxlength: [30, 'Поле "name" должно быть меньше 31 символа'],
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minlength: [2, 'Поле "about" должно быть больше 1 символа'],
      maxlength: [200, 'Поле "about" должно быть меньше 201 символа'],
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      validate: {
        validator: (v: string) => isURL(v),
        message: 'Поле "avatar" не соответствует формату url',
      },
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    },
    email: {
      type: String,
      unique: true,
      index: true,
      required: [true, 'Поле "email" обязательное для заполнения'],
      validate: {
        validator: (v: string) => isEmail(v),
        message: 'Поле "email" не соответствует формату email',
      },
    },
    password: {
      type: String,
      select: false,
      required: [true, 'Поле "password" обязательное для заполнения'],
      minlength: [6, 'Поле "password" должно быть больше 5 символов'],
    },
  },
  { versionKey: false },
);

export const User = model<TUser>('user', userSchema, 'users');
