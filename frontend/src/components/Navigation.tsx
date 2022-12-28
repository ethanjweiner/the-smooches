import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import AuthStatus from './AuthStatus';
import Icon from './Icon';

function Navigation() {
  const navStyle = {
    borderBottom: '15px solid #2AB34C',
    color: 'red',
  };

  const noUnderline = {
    textDecoration: 'none',
  };

  return (
    <Navbar bg="light" expand="lg" style={navStyle}>
      <Container>
        <Link to="/" style={noUnderline}>
          <Navbar.Brand>THE SMOOCHES</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" style={noUnderline}>
              <Nav.Link as="span">
                <Icon>
                  <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                  <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2zM14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1zM2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10z" />
                </Icon>{' '}
                Slideshows
              </Nav.Link>
            </Link>
            <Link to="/upload" style={noUnderline}>
              <Nav.Link as="span">
                <Icon>
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                  <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
                </Icon>{' '}
                Upload
              </Nav.Link>
            </Link>
          </Nav>
          <AuthStatus />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
