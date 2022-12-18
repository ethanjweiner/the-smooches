import express from 'express';
const app = express();

import mongoose from 'mongoose';
import ImagesRouter from './controllers/images';
import config from './utils/config';

if (config.MONGODB_URI) {
  mongoose.connect(config.MONGODB_URI);
}

app.use('/api/images', ImagesRouter);

export default app;
