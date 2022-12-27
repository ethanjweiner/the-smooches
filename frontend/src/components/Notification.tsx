import { Alert } from 'react-bootstrap';

function Notification({ message }: { message: string | null }) {
  if (!message) {
    return null;
  }

  return <Alert variant="success">{message}</Alert>;
}

export default Notification;
