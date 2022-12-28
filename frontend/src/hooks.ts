import { Image } from './types';
import { useCallback, useEffect, useState } from 'react';
import { fetchImages } from './services/images';
import { Queue } from './types';
import { useSelectedBucket } from './store/bucket';
import arrayShuffle from 'array-shuffle';
import { useErrorHandler } from 'react-error-boundary';
import { AxiosError } from 'axios';

export function useImage(interval: number): [Image | null, () => void] {
  const [image, setImage] = useState<Image | null>(null);
  const { bucket } = useSelectedBucket();

  const handleError = useCustomErrorHandler();

  const images = new Queue<Image>();

  const refreshImages = useCallback(async () => {
    if (images.isEmpty()) {
      try {
        const data = await fetchImages(bucket, 5);
        images.enqueue(...arrayShuffle(data));
      } catch (error) {
        handleError(error);
      }
    }

    setImage(images.dequeue());
  }, [bucket]);

  useEffect(() => {
    refreshImages();
    const intervalId = setInterval(refreshImages, interval);
    return () => clearInterval(intervalId);
  }, [bucket, interval]);

  return [image, refreshImages];
}

export function useCustomErrorHandler() {
  const defaultHandler = useErrorHandler();

  return function (error: unknown) {
    let message = 'An error occurred.';
    console.log(error);

    if (error instanceof AxiosError && error.response?.data.message) {
      message = error.response.data.message;
    } else if (error instanceof Error) {
      message = error.message;
    }

    defaultHandler(new Error(message));
  };
}
