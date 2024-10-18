import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import ChatIcon from '@mui/icons-material/Chat';
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
  const navigate = useNavigate();
  const showSidebar = () => setSidebar(!sidebar);

  useEffect(() => {
    // Retrieve user data from storage
    const user_id = sessionStorage.getItem("user_id");
    const user_type = sessionStorage.getItem("user_type");

    if (user_id && user_type) {
      fetchData(user_id, user_type);

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async (user_id, user_type) => {
    try {
      const response = await axios.get(
        `http://localhost/quickmatch_api/getCustomerDetail.php?user_id=${user_id}`
      );
      const data = response.data;
      console.log("raw data: ", data);
      if (data) {
        setUser({
          ...user,
          name: data.name,
          username: data.username,
          email: data.email,
          type: data.user_type,
          avatar: data.profile_image ? `http://localhost/quickmatch_api/profile_images/${data.profile_image}` : userAvatar,
        });
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };
  const handleLogout = () => {
   if(sessionStorage.getItem('previous_user_type')){
    const adminSession = sessionStorage.getItem('previous_user_type');
    const id = sessionStorage.getItem('user_id');
    sessionStorage.clear()


    if (adminSession) {
      sessionStorage.setItem('user_type', adminSession);
      sessionStorage.setItem('user_id', id);
    }


    navigate('/adminmonitoring');
  }else{
    sessionStorage.clear();
  navigate('/');
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
            <Dropdown >
              <Dropdown.Toggle variant="success" className="menu-drop">
                <img src={user.avatar} alt="User Avatar" className="topAvatar" />
              </Dropdown.Toggle>

              <Dropdown.Menu className="menu" style={{ width: '180px' }}>
                <Dropdown.ItemText className="admin-name">
                  <img src={user.avatar} alt="User Avatar" className="topAvatar" /> {user.username}
                </Dropdown.ItemText>
                <Dropdown.Item style={{ textAlign: 'center'}}
                  onClick={() => {
                    setModalOpen(true);
                  }}
                >
                  My Account
                </Dropdown.Item>
                <Dropdown.Item style={{ textAlign: 'center' }} onClick={handleLogout}>
                  Logout
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
            <Dropdown.Item eventKey="2" className="service-link" as={Link} to="/electric">
              <ElectricBoltIcon className="symbol" />
              Electric
            </Dropdown.Item>

            <Dropdown.Item eventKey="3" className="service-link" as={Link} to='/electronic'>
              <CableIcon className="symbol" />&nbsp;
              Electronic
            </Dropdown.Item>
            <Dropdown.Item eventKey="4" className="service-link" as={Link} to='/construction'>
              <ConstructionIcon className="symbol" />&nbsp;
              Construction
            </Dropdown.Item>
            <Dropdown.Item eventKey="5" className="service-link" as={Link} to='/eventmanagement'>
              <FestivalOutlinedIcon className="symbol" />&nbsp;
              Event Management
            </Dropdown.Item>
          </Dropdown>
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
            <Link to="/customerfeedbacksection">
              <ChatIcon />
              <span>Feedback Section</span>
            </Link>
          </li>

          <li className="nav-text">
            <Link to="/customeraccountsettings">
              <ManageAccountsIcon />
              <span>Profile Settings</span>
            </Link>
          </li>

          <li className="nav-text" onClick={handleLogout}>
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

      {modalOpen && user && (
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
