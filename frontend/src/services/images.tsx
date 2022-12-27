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

  await axios.post('/api/images', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `bearer ${token}`,
    },
  });
};

const deleteImage = async (imageName: string) => {
  console.log(token);
  await axios.delete(`/api/images/${imageName}`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
};

export { fetchImages, postImage, deleteImage, token, setToken };
