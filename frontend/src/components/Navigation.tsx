import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

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
              <Nav.Link as="span">Slideshows</Nav.Link>
            </Link>
            <Link to="/upload" style={noUnderline}>
              <Nav.Link as="span">Upload</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
