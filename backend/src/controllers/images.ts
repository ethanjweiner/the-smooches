import { DEFAULT_COUNT } from '../utils/config';
import { Router } from 'express';
import ImageModel from '../models/image';
import multer from 'multer';
import { deleteImage, putImage } from '../utils/s3_client';
import { Bucket } from '../types/types';
import { authenticate } from '../utils/middleware';
import { getRandomImages } from '../utils/helpers';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const ImagesRouter = Router();

ImagesRouter.get('/:bucket', async (req, res) => {
  const { bucket } = req.params;

  const count =
    typeof req.query.count === 'string'
      ? parseInt(req.query.count)
      : DEFAULT_COUNT;

  const images = await getRandomImages(count, bucket);

  return res.json(images);
});

ImagesRouter.post('/', upload.single('image'), async (req, res) => {
  let { caption, bucket } = req.body;

  // If unauthenticated, force redirect upload to community
  if (!req.user && bucket !== Bucket.community) {
    throw Error('authentication required');
  }

  if (!req.file) {
    throw Error('no file given');
  }

  if (!Object.values(Bucket).includes(bucket)) {
    throw Error('bucket does not exist');
  }

  const imageName = await putImage(req.file, bucket);

  await ImageModel.create({
    name: imageName,
    caption,
    bucket,
  });

  return res.status(201).send();
});

ImagesRouter.delete('/:name', authenticate, async (req, res) => {
  const { name } = req.params;

  const imageToDelete = await ImageModel.findOne({ name });

  if (!imageToDelete) {
    throw Error('specified image does not exist');
  }

  await deleteImage(imageToDelete.name, imageToDelete.bucket);
  await imageToDelete.delete();

  return res.status(204).send();
});

export default ImagesRouter;
