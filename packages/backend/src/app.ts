import 'dotenv/config';
import express, { json, urlencoded } from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import limiter from './security-helpers/expressRateLimit';
import cors from './security-helpers/cors';
import { router } from './routes';
import { handleErrors } from './controllers/errors';
import { auth } from './middlewares/auth';
import { createUser, login } from './controllers/users';
import { usersRouter } from './routes/users';

mongoose.connect(process.env.DB_URI as string)
  .then(() => console.log('Mongoose connected to database'))
  .catch((error) => console.log(error));

const app = express();
app.use(helmet());
app.use(limiter);
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors);

app.post('/signup', createUser);
app.post('/signin', login);

app.use(auth);
app.use(router);
app.use(handleErrors);

const { PORT = 4000 } = process.env;
app.listen(PORT, () => {
  console.log(`ExpressServer started on http://localhost:${PORT}`);
});
