import { useCallback, useState } from 'react';
import { Card, Container, Form } from 'react-bootstrap';
import Selector from '../components/Selector';
import Slideshow from '../components/Slideshow';
import { Bucket } from '../types';
import {
  MAX_SLIDESHOW_INTERVAL,
  MIN_SLIDESHOW_INTERVAL,
  DEFAULT_SLIDESHOW_INTERVAL,
} from '../utils/constants';
import { debounce } from '../utils/helpers';

function Slideshows() {
  const [slideshowInterval, setSlideshowInterval] = useState(
    DEFAULT_SLIDESHOW_INTERVAL
  );

  const updateInterval = useCallback(debounce(setSlideshowInterval, 200), []);

  const [sliderValue, setSliderValue] = useState(DEFAULT_SLIDESHOW_INTERVAL);

  const onSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(parseInt(e.target.value));
    updateInterval(e.target.value);
  };

  return (
    <Container>
      <Card border="primary" className="mt-4 mx-auto">
        <Card.Header>
          <Selector buckets={Object.values(Bucket)} />
          <hr></hr>
          <Form.Label>Slideshow Speed</Form.Label>
          <Form.Range
            min={MIN_SLIDESHOW_INTERVAL}
            max={MAX_SLIDESHOW_INTERVAL}
            value={sliderValue}
            onChange={onSliderChange}
          ></Form.Range>
        </Card.Header>
        <Slideshow interval={slideshowInterval} />
      </Card>
    </Container>
  );
}

export default Slideshows;
