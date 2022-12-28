import Nav from 'react-bootstrap/Nav';
import { useSelectedBucket } from '../store/bucket';
import { Bucket } from '../types';
import { capitalize } from '../utils/helpers';

function Selector({ buckets }: { buckets: Bucket[] }) {
  const { setBucket } = useSelectedBucket();

  return (
    <Nav
      className="flex-column flex-md-row"
      variant="pills"
      defaultActiveKey={Bucket.community}
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

export default Selector;
