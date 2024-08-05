import React, { useState, useEffect } from "react";
import Logo from "../../../assets/logo.png";
import axios from "axios";
import "../../HomeNavBar/HomeNavBar.css";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import FeedbackIcon from "@mui/icons-material/Feedback";
import Modal from "../../AdminDashBoardComponents/Modal/Modal";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import userAvatar from "../../../assets/user-3.png";
import HomeIcon from '@mui/icons-material/Home';

const ProviderNav = () => {
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
    const user_id =
      sessionStorage.getItem("user_id") || localStorage.getItem("user_id");

    if (user_id) {
      fetchData(user_id);
    }
  }, []);

  const fetchData = async (user_id) => {
    try {
      const response = await axios.get(
        `http://localhost/quickmatch_api/providerDetails.php?user_id=${user_id}`
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
          avatar: fetchedUser.profile_image
            ? `http://localhost/quickmatch_api/profile_images/${fetchedUser.profile_image}`
            : userAvatar,
        });
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };
  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate("/");
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
                <img src={user.avatar} alt="" className="topAvatar" />
              </Dropdown.Toggle>

              <Dropdown.Menu className="menu">
                <Dropdown.ItemText className="admin-name">
                  <img src={user.avatar} alt="" className="topAvatar" />{" "}
                  {user.name}
                </Dropdown.ItemText>
                <Dropdown.Item
                  onClick={() => {
                    setModalOpen(true);
                  }}
                >
                  My Account
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>
                  <Link to="/" className="nav-link">
                    Logout
                  </Link>
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
            <Link to="/providerIntro">
              <HomeIcon />
              <span>Home</span>
            </Link>
          </li>

          <li className="nav-text">
            <Link to="/providerhome">
              <ManageAccountsIcon />
              <span>Profile Settings</span>
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
          type={user.type}
          name={user.name}
          username={user.username}
          email={user.email}
        />
      )}
    </>
  );
};

export default ProviderNav;
