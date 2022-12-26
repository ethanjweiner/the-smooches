import { CLOUDFRONT_DIST_DOMAIN } from './constants';

export function capitalize(string: string): string {
  return string[0].toUpperCase() + string.slice(1);
}

export const imageNameToURL = (imageName: string, bucketName: string) => {
  return `${CLOUDFRONT_DIST_DOMAIN}/${bucketName}/${imageName}`;
};
