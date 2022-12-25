import { Schema, model } from 'mongoose';
import { Image } from '../utils/types';

const imageSchema = new Schema<Image>({
  name: {
    type: String,
    required: true,
  },
  bucket: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: false,
  },
});

imageSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const ImageModel = model<Image>('Image', imageSchema);

export default ImageModel;
