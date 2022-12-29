import { Image } from './types';
import { useCallback, useEffect, useState } from 'react';
import { fetchImages } from './services/images';
import { Queue } from './types';
import { useSelectedBucket } from './store/bucket';
import arrayShuffle from 'array-shuffle';
import { useErrorHandler } from 'react-error-boundary';
import { AxiosError } from 'axios';

export function useImage(
  interval: number
): [Image | null, boolean, () => void] {
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

  const [imageSkipper, setImageSkipper] = useState(false);

  const skip = () => setImageSkipper(!imageSkipper);
  const [imageLoading, setImageLoading] = useState<boolean>(false);

  let intervalId: NodeJS.Timer;

  useEffect(() => {
    setImageLoading(true);
    refreshImages().then(() => setTimeout(() => setImageLoading(false), 100));
    intervalId = setInterval(refreshImages, interval);
    return () => clearInterval(intervalId);
  }, [bucket, interval, imageSkipper]);

  return [image, imageLoading, skip];
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
