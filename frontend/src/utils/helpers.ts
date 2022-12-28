/* eslint-disable @typescript-eslint/no-explicit-any */
import { S3_DIST_DOMAIN } from './constants';

export function capitalize(string: string): string {
  return string[0].toUpperCase() + string.slice(1);
}

export const imageNameToURL = (imageName: string, bucketName: string) => {
  return `${S3_DIST_DOMAIN}/${bucketName}/${imageName}`;
};

export const debounce = (func: (...args: any[]) => any, ms: number) => {
  let timeoutID: NodeJS.Timeout;

  return function (...args: any[]) {
    clearTimeout(timeoutID);

    timeoutID = setTimeout(() => {
      func(args);
    }, ms);
  };
};
