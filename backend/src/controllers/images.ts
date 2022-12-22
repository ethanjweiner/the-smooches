import { DEFAULT_COUNT } from '../utils/constants';
import { Router } from 'express';
import ImageModel from '../models/image';
require('express-async-errors');
const ImagesRouter = Router();

ImagesRouter.get('/:bucket', async (req, res) => {
  const { bucket } = req.params;

  let count: number;

  if (typeof req.query.count == 'string') {
    count = parseInt(req.query.count);
  } else {
    count = DEFAULT_COUNT;
  }

  const images = await ImageModel.find({
    bucket,
  }).limit(count);

  return res.json(images);
});

export default ImagesRouter;
