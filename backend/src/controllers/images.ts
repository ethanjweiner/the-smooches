import { DEFAULT_COUNT } from '../utils/constants';
import { Router } from 'express';
import ImageModel from '../models/image';
import multer from 'multer';
import { deleteImage, putImage } from '../utils/s3_client';
import { Image } from '../types/types';
import { authenticate } from '../utils/middleware';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const ImagesRouter = Router();

const getRandomImages = async (maxCount: number, bucket: string) => {
  const total = await ImageModel.count({ bucket });

  const imagePromises: Promise<Image>[] = [];
  const imageIndices: number[] = [];

  for (let index = 0; index < Math.min(maxCount, total); index++) {
    const randIndex = Math.floor(Math.random() * total);

    if (imageIndices.includes(randIndex)) {
      continue;
    }

    imagePromises.push(ImageModel.findOne({ bucket }).skip(randIndex).then());
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

  return res.json(images);
});

ImagesRouter.post(
  '/',
  authenticate,
  upload.single('image'),
  async (req, res) => {
    const { caption, bucket } = req.body;

    if (!req.file) {
      throw Error('no file given');
    }

    const imageName = await putImage(req.file, bucket);

    await ImageModel.create({
      name: imageName,
      caption,
      bucket,
    });

    return res.status(201).send();
  }
);

ImagesRouter.delete('/:name', authenticate, async (req, res) => {
  const { name } = req.params;

  const imageToDelete = await ImageModel.findOne({ name });

  if (!imageToDelete) {
    throw Error('specified image does not exist');
  }

  if (process.env['NODE_ENV'] === 'production') {
    await deleteImage(imageToDelete.name, imageToDelete.bucket);
  }

  await imageToDelete.delete();

  return res.status(204).send();
});

export default ImagesRouter;
