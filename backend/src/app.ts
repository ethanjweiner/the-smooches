import express from 'express';
const app = express();

import mongoose from 'mongoose';
import ImagesRouter from './controllers/images';
import config from './utils/config';
import { initDB } from './utils/db_seed';

if (config.MONGODB_URI) {
  mongoose.connect(config.MONGODB_URI).then(() => {
    if (config.NODE_ENV == 'development') {
      initDB();
    }
  });
}

app.use('/api/images', ImagesRouter);

export default app;
