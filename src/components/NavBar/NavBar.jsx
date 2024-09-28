import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from '../../assets/logo.png';
import './NavBar.css'
import { Link } from 'react-scroll';
import { useState } from "react";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";

const NavigationBar = () => {

  const [loginOpen, setLoginOpen] = useState(false);
  const [signinOpen, setsigninOpen] = useState(false);


  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="nav">
        <Container>
          <Navbar.Brand className="d-flex align-center justify-content-between">
            <Link to="carousel" smooth={true} offset={-50} duration={500}>
              <img
                className="logo"
                alt="Logo"
                src={Logo}
                width="60"
                height="60"

              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" className="toggle-icon" />
          <Navbar.Collapse id="responsive-navbar-nav" className="collapse-icon">
          <Nav className="me-auto middle">
          <Link to="carousel" className="nav-link" smooth={true} offset={-50} duration={500}>
            Home
          </Link>
          <Link to="services" className="nav-link" smooth={true} offset={-300} duration={500}>
            Services
          </Link>
          <Link to="about" className="nav-link" smooth={true} offset={-300} duration={500}>
            About
          </Link>
          <Link to="review" className="nav-link" smooth={true} offset={-300} duration={500}>
            Reviews
          </Link>
          <Link to="contact" className="nav-link" smooth={true} offset={-280} duration={500}>
            Contact
          </Link>
        </Nav>
            <Nav>
              <div className="action-btn">
                <button className="login-btn" onClick={() => {
                  setLoginOpen(true)
                  setsigninOpen(false)
                }}>Login</button>
                <button className="signin-btn" onClick={() => {
                  setsigninOpen(true)
                  setLoginOpen(false)
                }
                }>Sign up</button>
              </div>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {loginOpen && (
        <Login loginClose={setLoginOpen} signupClose={setsigninOpen} />
      )}
      {signinOpen && (
        <Signup signupClose={setsigninOpen} loginClose={setLoginOpen} />
      )}
    </>
  );
};

export default NavigationBar;
