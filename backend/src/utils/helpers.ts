import crypto from 'crypto';
import ImageModel from '../models/image';
import { Image } from '../types/types';

export const randomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString('hex');

export const getRandomImages = async (maxCount: number, bucket: string) => {
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

export const refreshDB = async () => {
  await ImageModel.deleteMany({});
};
