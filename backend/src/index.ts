require('dotenv').config();

import express from 'express';
import { DEFAULT_COUNT } from './constants';
import { Image } from './types';

const app = express();

app.get('/api/images/:bucket', (req, res) => {
  // Use bucket for DB reqs
  // const { bucket } = req.params;

  let count: number;

  if (typeof req.query.count == 'string') {
    count = parseInt(req.query.count);
  } else {
    count = DEFAULT_COUNT;
  }

  count;

  // Hardcode images for now
  const images: Image[] = [
    {
      src: '/images/1.jpeg',
      caption: 'Bentley is a frickin wacko...',
    },
    {
      src: '/images/2.jpeg',
      caption: 'These dogs are wack',
    },
  ];

  // Retrieve `count` images from DB @ `bucket`
  res.json(images);
});

app.listen(process.env.PORT);
