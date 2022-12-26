import { useState } from 'react';
import { Card, Container, Form } from 'react-bootstrap';
import Selector from '../components/Selector';
import Slideshow from '../components/Slideshow';
import { SLIDESHOW_INTERVAL } from '../utils/constants';

function Slideshows() {
  const cardStyle = {
    maxWidth: 600,
    borderWidth: 5,
    fontSize: 22,
  };

  const [slideshowInterval, setSlideShowInterval] =
    useState(SLIDESHOW_INTERVAL);

  const onSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setSlideShowInterval(parseInt(e.target.value));
  };

  return (
    <Container>
      <Card border="primary" className="mt-4 mx-auto" style={cardStyle}>
        <Card.Header>
          <Selector />
          <Form.Label>Slideshow Speed</Form.Label>
          <Form.Range
            min={500}
            max={20000}
            value={slideshowInterval}
            onChange={onSliderChange}
          ></Form.Range>
        </Card.Header>
        <Slideshow interval={slideshowInterval} />
      </Card>
    </Container>
  );
}

export default Slideshows;
