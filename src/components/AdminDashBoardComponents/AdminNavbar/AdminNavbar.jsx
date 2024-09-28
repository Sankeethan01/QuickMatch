import React, { useState, useEffect } from "react";
import "./AdminNavbar.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import logo from "../../../assets/logo.png";
import { Dropdown } from "react-bootstrap";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Modal from "../Modal/Modal";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PersonIcon from "@mui/icons-material/Person";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import FeedbackIcon from "@mui/icons-material/Feedback";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import LogoutIcon from "@mui/icons-material/Logout";
import EngineeringIcon from "@mui/icons-material/Engineering";
import userAvatar from "../../../assets/user-3.png";

const AdminNavbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [admin, setAdmin] = useState({
    name: "",
    type: "",
    avatar: userAvatar,
    username: "",
    email: "",
  });
  const navigate = useNavigate();

  const showSidebar = () => setSidebar(!sidebar);

  useEffect(() => {
    const user_id = sessionStorage.getItem("user_id") || localStorage.getItem("user_id");

    if (user_id) {
      fetchData(user_id);
    }
  }, []);

  const fetchData = async (user_id) => {
    try {
      const response = await axios.get(`http://localhost/quickmatch_api/getAdminDetail.php?user_id=${user_id}`);
      const data = response.data;
      if (data) {
        setAdmin({
          ...admin,
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
    sessionStorage.clear();
    localStorage.clear();
    navigate('/');
  };

  return (
    <>
      <div className="navbar-admin">
        <Link to="#" className="menu-bars">
          <MenuIcon onClick={showSidebar} />
        </Link>
        <div className="topbarWrapper">
          <div className="topLeft">
            <Link to="/adminhome" className="nav-link">
              <span className="logo">
                <img src={logo} alt="Logo" />
              </span>
            </Link>
          </div>
          <div className="topRight">
            <Dropdown className="notific">
              <Dropdown.Toggle className="menu-drop">
                <NotificationsNoneIcon className="notific-icon" />
                <span className="topIconBadge">2</span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="menu">
                <Dropdown.Item className="drop-link" as={Link} to='/adminverification'>
                  verifications
                </Dropdown.Item>
                <Dropdown.Item className="drop-link" as={Link} to='/adminfeedbacks'>
                  feedbacks
                </Dropdown.Item>
                <Dropdown.Item className="drop-link" as={Link} to='/adminmessages'>
                  messages
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <Dropdown.Toggle variant="success" className="menu-drop">
                <img src={admin.avatar} alt="User Icon" className="topAvatar" />
              </Dropdown.Toggle>

              <Dropdown.Menu className="menu" style={{width:'180px'}}>
                <Dropdown.ItemText className="admin-name">
                  <img src={admin.avatar} alt="User Icon" className="topAvatar" /> {admin.name}
                </Dropdown.ItemText>
                <Dropdown.Item style={{textAlign:'center'}} onClick={() => setModalOpen(true)}>My Account</Dropdown.Item>
                <Dropdown.Item style={{textAlign:'center'}}  onClick={handleLogout}>
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
            <Link to="/adminhome">
              <DashboardIcon />
              <span>Overview</span>
            </Link>
          </li>
          <li className="nav-text">
            <Link to="/adminbookings">
              <ReceiptIcon />
              <span>Bookings</span>
            </Link>
          </li>
          <li className="nav-text">
            <Link to="/admincustomerlist">
              <PersonIcon />
              <span>Customers</span>
            </Link>
          </li>
          <li className="nav-text">
            <Link to="/adminproviderlist">
              <EngineeringIcon />
              <span>Providers</span>
            </Link>
          </li>
          <li className="nav-text">
            <Link to="/adminverification">
              <HowToRegIcon />
              <span>Verifications</span>
            </Link>
          </li>
          <li className="nav-text">
            <Link to="/adminfeedbacks">
              <FeedbackIcon />
              <span>Feedbacks</span>
            </Link>
          </li>
          <li className="nav-text">
            <Link to="/adminmonitoring">
              <ManageSearchIcon />
              <span>Monitoring</span>
            </Link>
          </li>
          <li className="nav-text">
            <Link to="/adminsettings">
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

      {modalOpen && admin && (
        <Modal
          setOpenModal={setModalOpen}
          type={admin.type}
          avatar={admin.avatar}
          name={admin.name}
          username={admin.username}
          email={admin.email}
        />
      )}
    </>
  );
};

export default AdminNavbar;
