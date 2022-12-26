import { DEFAULT_COUNT } from '../utils/constants';
import { Router } from 'express';
import ImageModel from '../models/image';
import multer from 'multer';
import { putImage } from '../utils/s3_client';
import { Image } from '../types/types';
require('express-async-errors');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const ImagesRouter = Router();

const getRandomImages = async (count: number, bucket: string) => {
  const total = await ImageModel.count({ bucket });

  const imagePromises: Promise<Image>[] = [];

  for (let index = 0; index < Math.min(count, total); index++) {
    imagePromises.push(
      ImageModel.findOne({ bucket })
        .skip(Math.floor(Math.random() * total))
        .then()
    );
  }

  return Promise.all(imagePromises);
};

ImagesRouter.get('/:bucket', async (req, res) => {
  const { bucket } = req.params;

  let count: number;

  if (typeof req.query.count == 'string') {
    count = parseInt(req.query.count);
  } else {
    count = DEFAULT_COUNT;
  }

  const images = await getRandomImages(count, bucket);
  console.log(images);

  return res.json(images);
});

ImagesRouter.post('/', upload.single('image'), async (req, res) => {
  const { caption, bucket } = req.body;

  if (!req.user) {
    return res
      .status(401)
      .json({ error: 'Must be authenticated to upload images' });
  }

  if (!req.file) {
    return res.status(400).json({ error: 'No file given' });
  }

  const imageName = await putImage(req.file, bucket);

  await ImageModel.create({
    name: imageName,
    caption,
    bucket,
  });

  return res.status(201).send();
});

export default ImagesRouter;
