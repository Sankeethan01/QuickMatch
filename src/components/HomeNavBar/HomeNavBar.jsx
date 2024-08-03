import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import CableIcon from '@mui/icons-material/Cable';
import ConstructionIcon from '@mui/icons-material/Construction';
import FestivalOutlinedIcon from '@mui/icons-material/FestivalOutlined';
import NotificationsActiveIcon from '@mui/icons-material/Notifications';
import LogoutIcon from "@mui/icons-material/Logout";
import Modal from "../AdminDashBoardComponents/Modal/Modal";
import Logo from "../../assets/logo.png";
import userAvatar from "../../assets/user-3.png";
import "./HomeNavBar.css";
import axios from "axios";

const HomeNavBar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState({
    name: "",
    type: "",
    avatar: userAvatar,
    username: "",
    email: "",
  });

  const showSidebar = () => setSidebar(!sidebar);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost/quickmatch_api/CustomerDetails.php"
      );
      const data = response.data;
      console.log("raw data: ", data);
      if (data && data.length > 0) {
        const fetchedUser = data[0]; // Assuming the first user object contains the needed info
        setUser({
          ...user,
          name: fetchedUser.name,
          username: fetchedUser.username,
          email: fetchedUser.email,
          type: fetchedUser.user_type,
          avatar: fetchedUser.profile_image ? `http://localhost/quickmatch_api/profile_images/${fetchedUser.profile_image}` : userAvatar,
        });
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  return (
    <>
      <div className="home-nav">
        <Link to="#" className="menu-bars">
          <MenuIcon onClick={showSidebar} />
        </Link>
        <div className="topbarWrapper">
          <div className="topLeft">
            <Link to="/home" className="nav-link">
              <span className="logo">
                <img src={Logo} alt="Logo" />
              </span>
            </Link>
          </div>
          <div className="topRight">
            <Dropdown>
              <Dropdown.Toggle variant="success" className="menu-drop">
                <img src={user.avatar} alt="User Avatar" className="topAvatar" />
              </Dropdown.Toggle>

              <Dropdown.Menu className="menu">
                <Dropdown.ItemText className="admin-name">
                  <img src={user.avatar} alt="User Avatar" className="topAvatar" /> {user.name}
                </Dropdown.ItemText>
                <Dropdown.Item
                  onClick={() => {
                    setModalOpen(true);
                  }}
                >
                  My Account
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to="/" className="nav-link">Logout</Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <CloseIcon />
            </Link>
          </li>

          <li className="nav-text">
            <Link to="/home">
              <HomeIcon />
              <span>Home</span>
            </Link>
          </li>
          <Dropdown className="service-dropdown">
            <Dropdown.Header className="drop-head">
              <WorkIcon />&nbsp;&nbsp;Services
            </Dropdown.Header>
            <Dropdown.Item eventKey="2" className="service-link">
              <ElectricBoltIcon className="symbol" />&nbsp;
              <Link to="/electric" className="nav-link">Electric</Link>
            </Dropdown.Item>
            <Dropdown.Item eventKey="3" className="service-link">
              <CableIcon className="symbol" />&nbsp;
              <Link to="/electronic" className="nav-link">Electronic</Link>
            </Dropdown.Item>
            <Dropdown.Item eventKey="4" className="service-link">
              <ConstructionIcon className="symbol" />&nbsp;
              <Link to="/construction" className="nav-link">Construction</Link>
            </Dropdown.Item>
            <Dropdown.Item eventKey="5" className="service-link">
              <FestivalOutlinedIcon className="symbol" />&nbsp;
              <Link to="/eventmanagement" className="nav-link">Event Management</Link>
            </Dropdown.Item>
          </Dropdown>
          <li className="nav-text">
            <Link to="/customeraccountsettings">
              <ManageAccountsIcon />
              <span>Profile Settings</span>
            </Link>
          </li>

          <li className="nav-text">
            <Link to="/customernotifications">
              <NotificationsActiveIcon />
              <span>Notifications</span>
            </Link>
          </li>

          <li className="nav-text">
            <Link to="/contact">
              <PermPhoneMsgIcon />
              <span>Contact</span>
            </Link>
          </li>

          <li className="nav-text">
            <Link to="/">
              <LogoutIcon />
              <span>Logout</span>
            </Link>
          </li>
        </ul>
        <div className="admin-footer">
          &copy; {new Date().getFullYear()} QuickMatch
        </div>
      </nav>

      {modalOpen && (
        <Modal
          setOpenModal={setModalOpen}
          avatar={user.avatar}
          name={user.name}
          username={user.username}
          email={user.email}
          type={user.type}
        />
      )}
    </>
  );
};

export default HomeNavBar;