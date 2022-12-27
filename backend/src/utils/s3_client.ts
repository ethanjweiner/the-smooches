import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import config from './config';
import { Bucket } from '../types/types';
import crypto from 'crypto';

const randomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString('hex');

const s3 = new S3Client({
  credentials: {
    accessKeyId: config.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY as string,
  },
  region: 'us-east-1',
});

export const putImage = async (
  file: Express.Multer.File,
  bucket: Bucket
): Promise<string> => {
  const imageName = randomImageName();

  const params = {
    Bucket: config.S3_BUCKET_NAME,
    Key: `${bucket}/${imageName}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  const command = new PutObjectCommand(params);

  await s3.send(command);

  return imageName;
};

export const deleteImage = async (imageName: string, bucket: string) => {
  const params = {
    Bucket: config.S3_BUCKET_NAME,
    Key: `${bucket}/${imageName}`,
  };

  const command = new DeleteObjectCommand(params);

  await s3.send(command);
};
