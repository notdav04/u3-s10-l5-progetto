import { Navbar, Container } from "react-bootstrap";

function CustomNavbar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#home">MyWeatherApp -- Davide Alonzi</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
