import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logo from "../assets/logo.png";

const NavigationBar = () => {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt="Logo"
              src={Logo}
              width="60"
              height="60"
              className="d-inline-block align-center"
            />
            QuickMatch
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features">Home</Nav.Link>
              <NavDropdown title="Services" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">
                  Electric & Electronic
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.2">
                  Event Management
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.3">
                  Construction
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#pricing">About</Nav.Link>
              <Nav.Link href="#contact">Contact Us</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#deets">Sign In</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                Register
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
