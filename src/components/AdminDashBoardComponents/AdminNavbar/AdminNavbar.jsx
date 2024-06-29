import React, { useState } from "react";
import "./AdminNavbar.css";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import logo from "../../../assets/logo.png";
import { Dropdown } from "react-bootstrap";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import user_icon from "../../../assets/user-1.png";
import Modal from "../Modal/Modal";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PersonIcon from "@mui/icons-material/Person";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import FeedbackIcon from "@mui/icons-material/Feedback";
import ForumIcon from "@mui/icons-material/Forum";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const AdminNavbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const admin = {
    name: "Deluxshana",
    avatar: user_icon,
    username: "dinasana10",
    email: "dinasana10@gmail.com",
  };

  return (
    <>
      <div className="navbar-admin">
        <Link to="#" className="menu-bars">
          <MenuIcon onClick={showSidebar} />
        </Link>
        <div className="topbarWrapper">
          <div className="topLeft">
            <span className="logo">
              <img src={logo} alt="" />
            </span>
          </div>
          <div className="topRight">
            <Dropdown className="notific">
              <Dropdown.Toggle className="menu-drop">
                <NotificationsNoneIcon className="notific-icon" />
                <span className="topIconBadge">2</span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="menu">
                <Dropdown.Item>
                  <Link to="/adminverification" className="drop-link">
                    1 verifications
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to="/adminfeedbacks" className="drop-link">
                    3 feedbacks
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to="/adminmessages" className="drop-link">
                    4 messages
                  </Link>{" "}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <Dropdown.Toggle variant="success" className="menu-drop">
                <img src={user_icon} alt="" className="topAvatar" />
              </Dropdown.Toggle>

              <Dropdown.Menu className="menu">
                <Dropdown.ItemText className="admin-name">
                  <img src={user_icon} alt="" className="topAvatar" /> Admin
                </Dropdown.ItemText>
                <Dropdown.Item
                  onClick={() => {
                    setModalOpen(true);
                  }}
                >
                  My Account
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to="/adminsettings" className="drop-link">
                    Settings
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item href="#">Logout</Dropdown.Item>
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
              <ManageAccountsIcon />
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
            <Link to="/adminmessages">
              <ForumIcon />
              <span>Messages</span>
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
              <SettingsIcon />
              <span>Settings</span>
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

      {modalOpen && admin && (
        <Modal
          setOpenModal={setModalOpen}
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
