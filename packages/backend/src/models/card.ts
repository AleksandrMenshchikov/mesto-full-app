import { Schema, model } from 'mongoose';
import { isURL } from 'validator';
import { TCard } from '../types/types';

const cardSchema = new Schema<TCard>(
  {
    name: {
      type: String,
      required: [true, 'Поле "name" обязательное для заполнения'],
      minlength: [2, 'Поле "name" должно быть больше 1 символа'],
      maxlength: [30, 'Поле "name" должно быть меньше 31 символа'],
    },
    link: {
      type: String,
      required: [true, 'Поле "link" обязательное для заполнения'],
      validate: {
        validator: (v: string) => isURL(v),
        message: 'Поле "link" не соответствует формату url',
      },
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Поле "owner" обязательное для заполнения'],
    },
    likes: {
      type: [{
        type: Schema
          .Types.ObjectId,
        ref: 'user',
      }],
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

export const Card = model<TCard>('card', cardSchema, 'cards');
