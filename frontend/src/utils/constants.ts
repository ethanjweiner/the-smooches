import { Bucket } from '../types';

export const DEFAULT_BUCKET = Bucket.community;
export const DEFAULT_ICON_SIZE = 20;
export const S3_DIST_DOMAIN =
  process.env.NODE_ENV === 'development'
    ? 'https://smooches-images-dev.s3.amazonaws.com'
    : 'https://d2jsbe4kz9t2p7.cloudfront.net';
export const DEFAULT_SLIDESHOW_INTERVAL = 5000;
export const MIN_SLIDESHOW_INTERVAL = 500;
export const MAX_SLIDESHOW_INTERVAL = 20000;
