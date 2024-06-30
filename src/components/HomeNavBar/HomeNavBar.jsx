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
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  height: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
 
};


const HomeNavBar = () => {
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <><Navbar collapseOnSelect expand="lg" className="nav">
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
            <Nav.Link className="nav-link-back">
            <Link to="/home" className="nav-link">
                Home
              </Link>
            </Nav.Link>
            <Nav.Link>
            <NavDropdown title="Services" className="title-drop">
              <NavDropdown.Item>
                <Link to="/electric" className="nav-link-drop">
                  Electric Services
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Link to="/electronic" className="nav-link-drop">
                  Electronic Services
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Link to="/construction" className="nav-link-drop">
                  Construction Works
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Link to="/eventmanagement" className="nav-link-drop">
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
      <Dropdown.ItemText className="user-name"><img src={user} alt="" className="topAvatar" /> Customer 02</Dropdown.ItemText>
        <Dropdown.Item onClick={handleOpen}>My Account</Dropdown.Item>
        <Dropdown.Item href="#">Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style} >
            <div className="info-modal">
              <img src={user} alt="" />
               <h2>Customer 02</h2>
               <h4>customer02@gmail.com</h4>
               <h4>Jaffna</h4>
                          </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default HomeNavBar;
