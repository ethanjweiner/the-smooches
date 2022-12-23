import { Image } from './types';
import { useEffect, useState } from 'react';
import { SLIDESHOW_INTERVAL } from './utils/constants';
import { fetchImages } from './services/buckets';
import { Queue } from './types';
import { useSelectedBucket } from './store/bucket';

// Provides an image state for
export function useImage(): Image | null {
  const [image, setImage] = useState<Image | null>(null);
  const { bucket } = useSelectedBucket();

  const images = new Queue<Image>();

  const refreshImages = async () => {
    if (images.isEmpty()) {
      const data = await fetchImages(bucket, 10);
      images.enqueue(...data);
    }

    setImage(images.dequeue());
  };

  useEffect(() => {
    refreshImages();

    const intervalId = setInterval(refreshImages, SLIDESHOW_INTERVAL);

    return () => clearInterval(intervalId);
  }, [bucket]);

  return image;
}
