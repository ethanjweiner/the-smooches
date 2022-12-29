import { Button, ButtonGroup, Card, Form, Spinner } from 'react-bootstrap';
import { useActiveUser } from '../store/user';
import Selector from '../components/Selector';
import ImageUploader from '../components/ImageUploader';
import { useSelectedBucket } from '../store/bucket';
import { useState } from 'react';
import { capitalize } from '../utils/helpers';
import { postImage } from '../services/images';
import { Bucket } from '../types';
import { useEffect } from 'react';
import { useCustomErrorHandler } from '../hooks';

function Upload() {
  const { user } = useActiveUser();
  const { bucket: selectedBucket, setBucket } = useSelectedBucket();

  const [image, setImage] = useState<File | null>(null);
  const [caption, setCaption] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!user && selectedBucket != Bucket.community) {
      setBucket(Bucket.community);
    }
  }, [user]);

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

  const handleError = useCustomErrorHandler();

  const uploadImage = async () => {
    if (!image) {
      throw new Error('no image selected');
    }

    setLoading(true);

    try {
      await postImage(selectedBucket, image, caption);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }

    reset();
  };

  const uploadControls = (
    <ButtonGroup size="lg">
      <Button variant="success" disabled={loading} onClick={uploadImage}>
        Upload photo to "{capitalize(selectedBucket)}"
        {loading && (
          <Spinner animation="border" role="status" className="ms-2">
            <span className="visually-hidden">Uploading...</span>
          </Spinner>
        )}
      </Button>
      <Button variant="primary" disabled={loading} onClick={reset}>
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
          {!user && '(sign in for more)'}
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
