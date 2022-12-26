import express from 'express';
const app = express();
app.use(express.json());

import mongoose from 'mongoose';
import ImagesRouter from './controllers/images';
import LoginRouter from './controllers/login';
import config from './utils/config';
import { initDB } from './utils/db_seed';
import { loadToken, loadUser } from './utils/middleware';

if (config.MONGODB_URI) {
  mongoose.connect(config.MONGODB_URI).then(() => {
    if (config.NODE_ENV == 'development') {
      initDB();
    }
  });
}

app.use(loadToken);
app.use(loadUser);

app.use('/api/login', LoginRouter);
app.use('/api/images', ImagesRouter);

export default app;
