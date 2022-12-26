import { MapLike } from 'typescript';
import ImageModel from '../models/image';

import { Bucket, Image } from '../types/types';

export async function initDB() {
  await ImageModel.deleteMany({});

  const imageBuckets: MapLike<string[]> = {
    bentley: ['2', '3', '4', '5', '6', '7', '8', '9'],
    lady: ['1', '2', '3'],
    both: ['1'],
  };

  const images: Image[] = [];

  Object.keys(imageBuckets).forEach((bucketName) => {
    imageBuckets[bucketName].forEach((imageName) => {
      images.push({
        name: `${imageName}.jpeg`,
        bucket: bucketName as Bucket,
        caption: `Caption for image ${imageName}`,
      });
    });
  });

  await ImageModel.create(images);
}
