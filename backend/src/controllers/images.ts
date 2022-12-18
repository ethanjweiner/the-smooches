import { DEFAULT_COUNT } from '../utils/constants';
import { Router } from 'express';
import ImageModel from '../models/image';
require('express-async-errors');
const ImagesRouter = Router();

ImagesRouter.get('/:bucket', async (req, res) => {
  const { bucket } = req.params;

  const images = await ImageModel.find({
    bucket,
  });

  let count: number;

  if (typeof req.query.count == 'string') {
    count = parseInt(req.query.count);
  } else {
    count = DEFAULT_COUNT;
  }

  count;

  // Retrieve `count` images from DB @ `bucket`
  return res.json(images);
});

export default ImagesRouter;
