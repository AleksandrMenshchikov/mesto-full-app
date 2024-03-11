import { statuses } from '../constants';

export class BadRequest extends Error {
  readonly statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = statuses.BAD_REQUEST;
  }
}
