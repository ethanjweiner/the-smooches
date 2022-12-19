import { Image } from './types';
import { useEffect, useState } from 'react';
import { SLIDESHOW_INTERVAL } from './constants';
import { fetchImages } from './services/buckets';
import { Queue } from './types';

// Provides an image state for
export function useImage(): Image | null {
  const [image, setImage] = useState<Image | null>(null);
  const images = new Queue<Image>();

  const refreshImages = async () => {
    if (images.isEmpty()) {
      // Retrieve currently selected bucket here
      const data = await fetchImages('Bentley', 5);
      images.enqueue(...data);
    }

    setImage(images.dequeue());
  };

  useEffect(() => {
    refreshImages();

    const intervalId = setInterval(refreshImages, SLIDESHOW_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  return image;
}
