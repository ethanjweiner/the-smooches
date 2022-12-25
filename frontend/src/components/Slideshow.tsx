import { Card } from 'react-bootstrap';
import { useImage } from '../hooks';
import { imageNameToURL } from '../utils/helpers';

function Slideshow() {
  const image = useImage();

  const imageBorder = {
    border: '15px dashed #2AB34C',
  };

  const captionStyle = {
    fontStyle: 'italic',
  };

  if (!image) {
    return null;
  }

  return (
    <>
      {image.caption && (
        <Card.Footer style={captionStyle}>{image.caption}</Card.Footer>
      )}
      <Card.Img
        variant="bottom"
        src={imageNameToURL(image.name, image.bucket)}
        alt="Oops! Unable to load image."
        style={imageBorder}
      />
    </>
  );
}

export default Slideshow;
