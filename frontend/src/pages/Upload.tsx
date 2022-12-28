import { Button, ButtonGroup, Card, Form } from 'react-bootstrap';
import { useActiveUser } from '../store/user';
import Selector from '../components/Selector';
import ImageUploader from '../components/ImageUploader';
import { useSelectedBucket } from '../store/bucket';
import { useState } from 'react';
import { capitalize } from '../utils/helpers';
import { postImage } from '../services/images';
import { Bucket } from '../types';
import { useEffect } from 'react';

function Upload() {
  const { user } = useActiveUser();
  const { bucket: selectedBucket, setBucket } = useSelectedBucket();

  const [image, setImage] = useState<File | null>(null);
  const [caption, setCaption] = useState<string>('');

  useEffect(() => {
    if (!user && selectedBucket != Bucket.community) {
      setBucket(Bucket.community);
    }
  }, []);

  const buckets: Bucket[] = user ? Object.values(Bucket) : [Bucket.community];

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

    await postImage(selectedBucket, image, caption);

    reset();
  };

  const uploadControls = (
    <ButtonGroup size="lg">
      <Button variant="success" onClick={uploadImages}>
        Upload photo to "{capitalize(selectedBucket)}"
      </Button>
      <Button variant="primary" onClick={reset}>
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
        <p>Select a slideshow option</p>

        <Card.Subtitle
          className="text-secondary mb-3"
          style={{ fontStyle: 'italic' }}
        >
          sign in for more
        </Card.Subtitle>
        <Selector buckets={buckets}></Selector>
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
