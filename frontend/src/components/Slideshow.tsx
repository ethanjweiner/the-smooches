import { Button, Card, Container } from 'react-bootstrap';
import { useCustomErrorHandler, useImage } from '../hooks';
import { deleteImage } from '../services/images';
import { useActiveUser } from '../store/user';
import { Image } from '../types';
import { imageNameToURL } from '../utils/helpers';
import Icon from './Icon';

function Slideshow({ interval }: { interval: number }) {
  const [image, refreshImages] = useImage(interval);
  const { user } = useActiveUser();

  const handleError = useCustomErrorHandler();

  if (!image) {
    return null;
  }

  const onDeleteClick = async (imageToDelete: Image) => {
    try {
      await deleteImage(imageToDelete.name);
    } catch (error) {
      handleError(error);
    }

    refreshImages();
  };

  const imageBorder = {
    border: '15px dashed #2AB34C',
  };

  return (
    <>
      <Card.Footer>
        {image.caption && (
          <Card.Text style={{ fontStyle: 'italic' }} className="text-primary">
            {image.caption}
          </Card.Text>
        )}
        <Card.Subtitle>Click below to change image</Card.Subtitle>
      </Card.Footer>

      <Container className="image-container">
        <Card.Img
          variant="bottom"
          src={imageNameToURL(image.name, image.bucket)}
          alt="Oops! Unable to load image."
          style={imageBorder}
          onClick={refreshImages}
        />
        {user && (
          <Button
            variant="primary"
            size="sm"
            className="delete-button"
            onClick={() => onDeleteClick(image)}
          >
            <Icon>
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
            </Icon>
          </Button>
        )}
      </Container>
    </>
  );
}

export default Slideshow;
