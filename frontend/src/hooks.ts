import { Image } from './types';
import { useCallback, useEffect, useState } from 'react';
import { fetchImages } from './services/buckets';
import { Queue } from './types';
import { useSelectedBucket } from './store/bucket';
import arrayShuffle from 'array-shuffle';

// Provides an image state for
export function useImage(interval: number): Image | null {
  const [image, setImage] = useState<Image | null>(null);
  const { bucket } = useSelectedBucket();

  const images = new Queue<Image>();

  const refreshImages = useCallback(async () => {
    console.log('Images before refresh', images);
    if (images.isEmpty()) {
      const data = await fetchImages(bucket, 5);
      images.enqueue(...arrayShuffle(data));
    }

    console.log('Images after refresh', images, images.isEmpty());

    setImage(images.dequeue());
  }, [bucket]);

  useEffect(() => {
    refreshImages();

    const intervalId = setInterval(refreshImages, interval);

    return () => clearInterval(intervalId);
  }, [bucket, interval]);

  return image;
}
