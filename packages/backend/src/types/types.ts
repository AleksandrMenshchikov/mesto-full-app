import { Schema } from 'mongoose';

export type TUser = {
  name: string,
  about: string,
  avatar: string
}

export type TCard = {
  name: string,
  link: string,
  owner: Schema.Types.ObjectId,
  likes?: Schema.Types.ObjectId[],
  createdAt?: Date
}

export type TErr = {
  statusCode: number;
  message: string;
}
