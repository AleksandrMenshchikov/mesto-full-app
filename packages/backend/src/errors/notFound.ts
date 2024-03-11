import { statuses } from '../constants';

export class NotFound extends Error {
  readonly statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = statuses.NOT_FOUND;
  }
}
