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

const postImage = async (bucket: string, image: File, caption: string) => {
  const formData = new FormData();

  formData.append('image', image);
  formData.append('caption', caption);
  formData.append('bucket', bucket);

  await axios.post('/api/images', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export { fetchImages, postImage };
