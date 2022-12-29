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
    let randIndex = Math.floor(Math.random() * total);

    while (imageIndices.includes(randIndex)) {
      randIndex = Math.floor(Math.random() * total);
    }

    imageIndices.push(randIndex);
    imagePromises.push(ImageModel.findOne({ bucket }).skip(randIndex).then());
  }

  return Promise.all(imagePromises);
};

export const refreshDB = async () => {
  await ImageModel.deleteMany({});
};
