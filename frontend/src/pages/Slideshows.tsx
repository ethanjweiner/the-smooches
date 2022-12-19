import { Card, Container } from 'react-bootstrap';
import Selector from '../components/Selector';
import Slideshow from '../components/Slideshow';
// import { SelectedBucketProvider } from '../store';

function Slideshows() {
  const cardStyle = {
    maxWidth: 600,
    borderWidth: 5,
    fontSize: 22,
  };

  return (
    // <SelectedBucketProvider>
    <Container>
      <Card border="primary" className="mt-4 mx-auto" style={cardStyle}>
        <Card.Header>
          <Selector />
        </Card.Header>
        <Slideshow />
      </Card>
    </Container>
    //{' '}
    // </SelectedBucketProvider>
  );
}

export default Slideshows;
