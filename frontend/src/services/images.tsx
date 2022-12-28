import axios from 'axios';

import { Image } from '../types';

let token: string | null = null;

const setToken = (newToken: string) => {
  token = newToken;
};

const fetchImages = async (
  bucket: string,
  count?: number
): Promise<Image[]> => {
  let endpoint = `/api/images/${bucket}`;
  if (count) {
    endpoint += `?count=${count}`;
  }

  const response = await axios.get(endpoint);

  const images: Image[] = response.data;
  return images;
};

const postImage = async (bucket: string, image: File, caption: string) => {
  const formData = new FormData();

  formData.append('image', image);
  formData.append('caption', caption);
  formData.append('bucket', bucket);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const headers: any = {
    'Content-Type': 'multipart/form-data',
  };

  if (token) {
    headers['Authorization'] = `bearer ${token}`;
  }

  console.log(headers);

  await axios.post('/api/images', formData, {
    headers,
  });
};

const deleteImage = async (imageName: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const headers: any = {};

  if (token) {
    headers['Authorization'] = `bearer ${token}`;
  }

  await axios.delete(`/api/images/${imageName}`, {
    headers,
  });
};

export { fetchImages, postImage, deleteImage, token, setToken };
