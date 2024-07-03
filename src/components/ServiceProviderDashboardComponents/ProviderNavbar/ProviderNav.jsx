import React, { useState } from "react";
import Logo from "../../../assets/logo.png";
import user from "../../../assets/user-4.png";
import "../../HomeNavBar/HomeNavBar.css";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import FeedbackIcon from "@mui/icons-material/Feedback";
import Modal from "../../AdminDashBoardComponents/Modal/Modal";
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';

const ProviderNav = () => {
  const [sidebar, setSidebar] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const provider = {
    name: "Provider04",
    type: "Provider",
    avatar: user,
    username: "provider04",
    email: "provider04@gmail.com",
  };

  return (
    <>
      <div className="home-nav">
        <Link to="#" className="menu-bars">
          <MenuIcon onClick={showSidebar} />
        </Link>
        <div className="topbarWrapper">
          <div className="topLeft">
            <span className="logo">
              <img src={Logo} alt="" />
            </span>
          </div>
          <div className="topRight">
            <Dropdown>
              <Dropdown.Toggle variant="success" className="menu-drop">
                <img src={user} alt="" className="topAvatar" />
              </Dropdown.Toggle>

              <Dropdown.Menu className="menu">
                <Dropdown.ItemText className="admin-name">
                  <img src={user} alt="" className="topAvatar" /> provider04
                </Dropdown.ItemText>
                <Dropdown.Item
                  onClick={() => {
                    setModalOpen(true);
                  }}
                >
                  My Account
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
            <Link to="/providerhome">
              <ManageAccountsIcon />
              <span>Account Settings</span>
            </Link>
          </li>

          <li className="nav-text">
            <Link to="/providernotifications">
              <NotificationsActiveIcon />
              <span>Notifications</span>
            </Link>
          </li>
          <li className="nav-text">
            <Link to="/providerfinance">
              <AccountBalanceWalletIcon />
              <span>Finance</span>
            </Link>
          </li>

          <li className="nav-text">
            <Link to="/providerfeedback">
              <FeedbackIcon />
              <span>Feedback</span>
            </Link>
          </li>

          <li className="nav-text">
            <Link to="/providercontact">
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

      {modalOpen && provider && (
        <Modal
          setOpenModal={setModalOpen}
          avatar={provider.avatar}
          type={provider.type}
          name={provider.name}
          username={provider.username}
          email={provider.email}
        />
      )}
    </>
  );
};

export default ProviderNav;
