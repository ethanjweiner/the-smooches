import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useActiveUser } from '../store/user';

function LogInModal(props: { show: boolean; onHide: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loginError, setLoginError] = useState<string | null>(null);
  const { login } = useActiveUser();

  const onLogInFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(username, password);
      clearForm();
      props.onHide();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setLoginError(error.response.data.error);
    }
  };

  const clearForm = () => {
    setUsername('');
    setPassword('');
  };

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Log In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onLogInFormSubmit}>
          {loginError && (
            <Form.Group>
              <Form.Text className="text-danger">{loginError}</Form.Text>
            </Form.Group>
          )}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="success" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LogInModal;
