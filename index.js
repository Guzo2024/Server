import express from 'express';
import cors from 'cors';
import './db/server.js';
import authRouter from './routes/authRouter.js';
import cookieParser from 'cookie-parser';
import storeRouter from './routes/storeRouter.js';
import reviewRouter from './routes/reviewRouter.js';

import { errorHandler } from './middlewares/ErrorHandler.js';

const app = express();
const PORT = 5000;



app.use(cors({ origin: 'http://server-ersq.onrender.com', credentials: true }));

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/stores', storeRouter);
app.use('/reviews', reviewRouter);

app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
