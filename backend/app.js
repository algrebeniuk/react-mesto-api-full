import express, { json } from 'express';
import { set, connect } from 'mongoose';
import { errors } from 'celebrate';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import cors from 'cors';
import userRouter from './routes/user.js';
import cardRouter from './routes/card.js';
import { login, createUser } from './controllers/user.js';
import auth from './middlewares/auth.js';
import NotFoundError from './errors/not-found-error.js';
import CentralizedErrorHandling from './middlewares/centralized-error-handling.js';
import { validationOfUserSignUp, validationOfUserSignIn } from './middlewares/user-joi-validation.js';

const { PORT = 3000 } = process.env;
const app = express();
app.use(cors());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 1000 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

set('strictQuery', false);
connect('mongodb://127.0.0.1:27017/mestodb');

app.use(json());
app.use(limiter);
app.use(helmet());

app.post('/signup', validationOfUserSignUp, createUser);
app.post('/signin', validationOfUserSignIn, login);

app.use(auth);

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use((req, res, next) => {
  next(new NotFoundError('File not found'));
});

app.use(errors());

app.use(CentralizedErrorHandling);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
