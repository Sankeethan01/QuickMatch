import React from 'react'
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../../../assets/logo.png";
import user from "../../../assets/user-4.png";
import "../../HomeNavBar/HomeNavBar.css";
import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import './ProviderNav.css'

const ProviderNav = () => {
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
          
          <Nav className='pro-nav'>
          <Dropdown>
      <Dropdown.Toggle variant="success" className="menu-drop">
        <img src={user} alt="" className="topAvatar" />
      </Dropdown.Toggle>

      <Dropdown.Menu className="menu">
      <Dropdown.ItemText className="user-name"><img src={user} alt="" className="topAvatar" /> Provider 03</Dropdown.ItemText>
      <Dropdown.Item><Link to="/providerhome" className='nav-link'>My Account</Link></Dropdown.Item>
      <Dropdown.Item><Link to="/" className='nav-link'> Logout</Link></Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default ProviderNav