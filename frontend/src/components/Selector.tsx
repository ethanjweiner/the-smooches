import Nav from 'react-bootstrap/Nav';
import { useSelectedBucket } from '../store/bucket';
import { Bucket } from '../types';
import { capitalize } from '../utils/helpers';

function PillsExample() {
  const buckets = Object.values(Bucket);

  const { bucket: selectedBucket, setBucket } = useSelectedBucket();

  return (
    <Nav
      className="justify-content-center flex-column flex-md-row"
      variant="pills"
      defaultActiveKey={selectedBucket}
    >
      {buckets.map((bucket) => (
        <Nav.Item key={bucket}>
          <Nav.Link eventKey={bucket} onClick={() => setBucket(bucket)}>
            {capitalize(bucket)}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
}

export default PillsExample;
