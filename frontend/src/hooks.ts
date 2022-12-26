import { Image } from './types';
import { useEffect, useState } from 'react';
import { fetchImages } from './services/buckets';
import { Queue } from './types';
import { useSelectedBucket } from './store/bucket';
import arrayShuffle from 'array-shuffle';

// Provides an image state for
export function useImage(interval: number): Image | null {
  const [image, setImage] = useState<Image | null>(null);
  const { bucket } = useSelectedBucket();

  const images = new Queue<Image>();

  const refreshImages = async () => {
    if (images.isEmpty()) {
      const data = await fetchImages(bucket, 5);
      images.enqueue(...arrayShuffle(data));
    }

    setImage(images.dequeue());
  };

  useEffect(() => {
    refreshImages();

    const intervalId = setInterval(refreshImages, interval);

    return () => clearInterval(intervalId);
  }, [bucket, interval]);

  return image;
}
