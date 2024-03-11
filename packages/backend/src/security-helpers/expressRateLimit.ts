import { rateLimit } from 'express-rate-limit';
import { Request, Response } from 'express';

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 1 minute).
  message: (_req: Request, res: Response) => {
    res.send({ message: 'Возможно делать только 100 запросов в течение одной минуты' });
  },
});

export default limiter;
