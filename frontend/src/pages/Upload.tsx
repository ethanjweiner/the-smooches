import { Button, ButtonGroup, Card, Form } from 'react-bootstrap';
import { useActiveUser } from '../store/user';
import Selector from '../components/Selector';
import ImageUploader from '../components/ImageUploader';
import { useSelectedBucket } from '../store/bucket';
import { useState } from 'react';
import { capitalize } from '../utils/helpers';
import axios from 'axios';
import { postImage } from '../services/buckets';

function Upload() {
  const { user } = useActiveUser();
  const { bucket } = useSelectedBucket();

  const [image, setImage] = useState<File | null>(null);
  const [caption, setCaption] = useState<string>('');

  if (!user) {
    return (
      <h2 className="mt-5 text-center">
        You must be logged in to upload images.
      </h2>
    );
  }

  const cardStyle = {
    maxWidth: 600,
    borderWidth: 5,
    fontSize: 22,
  };

  const reset = () => {
    setImage(null);
    setCaption('');
  };

  const uploadImages = async () => {
    if (!image) {
      throw new Error('no image selected');
    }

    await postImage(bucket, image, caption);

    reset();
  };

  const uploadControls = (
    <ButtonGroup size="lg">
      <Button variant="success" onClick={uploadImages}>
        Upload photo to "{capitalize(bucket)}"
      </Button>
      <Button variant="danger" onClick={reset}>
        Cancel
      </Button>
    </ButtonGroup>
  );

  const captionControls = (
    <>
      <Form.Control
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        type="text"
        placeholder="Enter optional caption"
        className="mb-3"
      ></Form.Control>
    </>
  );

  return (
    <Card style={cardStyle} border="secondary" className="mt-4 mx-auto">
      <Card.Header>
        <Card.Title>Upload Images</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>Select a slideshow:</Card.Text>
        <Selector></Selector>
        <hr></hr>
        {image && captionControls}
        {image ? (
          uploadControls
        ) : (
          <ImageUploader onUpload={(file) => setImage(file)}></ImageUploader>
        )}
      </Card.Body>
    </Card>
  );
}

export default Upload;
