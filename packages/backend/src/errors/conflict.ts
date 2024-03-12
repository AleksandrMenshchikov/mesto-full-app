import { statuses } from '../constants';

export class Conflict extends Error {
  readonly statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = statuses.CONFLICT;
  }
}
