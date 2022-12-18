import { Card } from 'react-bootstrap';
import { useImage } from '../hooks';

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
      <Card.Footer style={captionStyle}>{image.caption}</Card.Footer>
      <Card.Img variant="bottom" src={image.src} style={imageBorder} />
    </>
  );
}

export default Slideshow;
