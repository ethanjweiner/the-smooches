import { DEFAULT_COUNT } from '../utils/constants';
import { Router } from 'express';
import ImageModel from '../models/image';
import multer from 'multer';
import { putImage } from '../utils/s3_client';
require('express-async-errors');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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

ImagesRouter.post('/', upload.single('image'), async (req, res) => {
  const { caption, bucket } = req.body;
  res.status(200).send();

  // Upload image to appropriate S3 bucket
  if (!req.file) {
    throw new Error('No file given');
  }

  const imageName = await putImage(req.file, bucket);

  // Add image to database w/ S3 src
  await ImageModel.create({
    name: imageName,
    caption,
    bucket,
  });

  res.status(201).send();
});

export default ImagesRouter;
