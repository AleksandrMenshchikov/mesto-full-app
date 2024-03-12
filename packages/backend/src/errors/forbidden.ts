import { statuses } from '../constants';

export class Forbidden extends Error {
  readonly statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = statuses.FORBIDDEN;
  }
}
