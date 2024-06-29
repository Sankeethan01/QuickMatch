import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logo from "../../assets/logo.png";
import user from "../../assets/user-3.png";
import "./HomeNavBar.css";
import React  from "react";
import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';

const HomeNavBar = () => {
  

  return (
    <Navbar collapseOnSelect expand="lg" className="nav">
      <Container>
        <Navbar.Brand
          className="d-flex align-center justify-content-between"
        >
          <Link to="/home" className="nav-link">
          <img className="logo" alt="Logo" src={Logo} width="60" height="60" /></Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto middle">
            <Nav.Link>
            <Link to="/home" className="nav-link">
                Home
              </Link>
            </Nav.Link>
            <Nav.Link>
            <NavDropdown title="Services">
              <NavDropdown.Item>
                <Link to="/electric" className="nav-link">
                  Electric Services
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Link to="/electronic" className="nav-link">
                  Electronic Services
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Link to="/construction" className="nav-link">
                  Construction Works
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Link to="/eventmanagement" className="nav-link">
                  Event Management
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
            </Nav.Link>
         
            <Nav.Link>
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
            </Nav.Link>
          </Nav>
          <Nav>
          <Dropdown>
      <Dropdown.Toggle variant="success" className="menu-drop">
        <img src={user} alt="" className="topAvatar" />
      </Dropdown.Toggle>

      <Dropdown.Menu className="menu">
      <Dropdown.ItemText className="user-name"><img src={user} alt="" className="topAvatar" /> username0011</Dropdown.ItemText>
        <Dropdown.Item href="#">My Account</Dropdown.Item>
        <Dropdown.Item href="#">Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HomeNavBar;
