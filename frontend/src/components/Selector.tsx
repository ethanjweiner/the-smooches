import Nav from 'react-bootstrap/Nav';

function PillsExample() {
  return (
    <Nav
      className="justify-content-center flex-column flex-md-row"
      variant="pills"
      defaultActiveKey="lady-bentley"
    >
      <Nav.Item>
        <Nav.Link eventKey="lady">Lady</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="bentley">Bentley</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="lady-bentley">Both</Nav.Link>
      </Nav.Item>
      <Nav.Item>{/* Add button here for adding more */}</Nav.Item>
    </Nav>
  );
}

export default PillsExample;
