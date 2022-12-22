import { MapLike } from 'typescript';
import ImageModel from '../models/image';
import config from './config';
import { Bucket, Image } from './types';

export async function initDB() {
  await ImageModel.deleteMany({});

  if (typeof config.CLOUDFRONT_DIST_DOMAIN !== 'string') {
    throw new Error('No Cloudfront distribution domain provided.');
  }

  // Hardcoded image data present in S3 buckets as seed data
  const imageBuckets: MapLike<string[]> = {
    bentley: ['2', '3', '4', '5', '6', '7', '8', '9'],
    lady: ['1', '2', '3'],
    both: ['1'],
  };
  const images: Image[] = [];

  Object.keys(imageBuckets).forEach((bucketName) => {
    imageBuckets[bucketName].forEach((imageName) => {
      images.push({
        src: `${config.CLOUDFRONT_DIST_DOMAIN}/${bucketName}/${imageName}.jpeg`,
        bucket: bucketName as Bucket,
        caption: `Caption for image ${imageName}.jpeg`,
      });
    });
  });

  await ImageModel.create(images);
}
