import { Schema } from 'mongoose';

export type TUser = {
  name?: string,
  about?: string,
  avatar?: string,
  email: string,
  password: string
}

export type TPayload = {
  _id: Schema.Types.ObjectId,
  iat: number,
}

export type TCard = {
  name: string,
  link: string,
  owner: Schema.Types.ObjectId,
  likes?: Schema.Types.ObjectId[],
  createdAt?: Date
}
