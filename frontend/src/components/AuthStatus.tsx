import { useState } from 'react';
import { Nav } from 'react-bootstrap';
import Icon from './Icon';
import LogInModal from './LogInModal';

function AuthStatus() {
  // If user is logged in -> display user info, otherwise display something else
  const [logInModalShow, setLogInModalShow] = useState(false);

  return (
    <Nav>
      <Nav.Link onClick={() => setLogInModalShow(true)}>
        <Icon>
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
        </Icon>{' '}
        Login
      </Nav.Link>
      <LogInModal
        show={logInModalShow} // Determines when modal is visible
        onHide={() => setLogInModalShow(false)} // Upon hiding, reset to false
      ></LogInModal>
    </Nav>
  );
}

export default AuthStatus;
