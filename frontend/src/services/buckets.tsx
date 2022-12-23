import axios from 'axios';

import { Image } from '../types';

const fetchImages = async (
  bucket: string,
  count?: number
): Promise<Image[]> => {
  let endpoint = `/api/images/${bucket}`;
  if (count) {
    endpoint += `?count=${count}`;
  }

  const response = await axios.get(endpoint);

  // No need to validate, type is shared from backend
  const images: Image[] = response.data;
  return images;
};

export { fetchImages };
