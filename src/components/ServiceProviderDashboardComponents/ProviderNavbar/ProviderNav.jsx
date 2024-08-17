import React, { useState, useEffect } from "react";
import Logo from "../../../assets/logo.png";
import axios from "axios";
import "../../HomeNavBar/HomeNavBar.css";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import FeedbackIcon from "@mui/icons-material/Feedback";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import userAvatar from "../../../assets/user-3.png";
import ModalView from "../../AdminDashBoardComponents/Modal/Modal";

const ProviderNav = () => {
  const [sidebar, setSidebar] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalViewOpen, setModalViewOpen] = useState(false);
  const [status, setStatus] = useState("offline"); // Initial status
  const [providerId,setProviderId] = useState('');
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
      sessionStorage.getItem("user_id");

    if (user_id) {
      fetchData(user_id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async (user_id) => {
    try {
      const response = await axios.get(
        `http://localhost/quickmatch_api/getProviderDetail.php?user_id=${user_id}`
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
          avatar: data.profile_image
            ? `http://localhost/quickmatch_api/profile_images/${data.profile_image}`
            : userAvatar,
        });
        switch(data.status){
          case 1 :
            setStatus('online');
            break;

            case 2:
              setStatus('ofline');
              break;

              default:
                setStatus("");
                break
        }
        
        setProviderId(data.provider_id);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };
  const handleLogout = () => {

    const adminSession = sessionStorage.getItem('previous_user_type');
    const id = sessionStorage.getItem('user_id');
    sessionStorage.clear()


    if (adminSession) {
        sessionStorage.setItem('user_type', adminSession);
        sessionStorage.setItem('user_id', id);
    }

   
    navigate('/adminmonitoring');
};

  const handleStatusChange = async () => {
    const newStatus = status === "online" ? "offline" : "online";
    setStatus(newStatus); 
  
    try {
      console.log("Sending status update:", {
        providerId,
        status: newStatus === "online" ? "1" : "0",
      });
  
      await axios.post("http://localhost/quickmatch_api/setOnlineStatus.php", {
        providerId,
        status: newStatus === "online" ? "1" : "0",
      });
    } catch (error) {
      console.error("Failed to update status:", error);
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
            <span className="logo">
              <img src={Logo} alt="" />
            </span>
          </div>
          <div className="topRight">
            <Dropdown>
              <Dropdown.Toggle variant="success" className="menu-drop">
                <img src={user.avatar} alt="" className="topAvatar" />
              </Dropdown.Toggle>

              <Dropdown.Menu className="menu" style={{ width: '180px' }}>
                <Dropdown.ItemText className="admin-name">
                  <img src={user.avatar} alt="" className="topAvatar" />{" "}
                  {user.username}
                </Dropdown.ItemText>
                <Dropdown.Item style={{ textAlign: 'center' }}
                  onClick={() => {
                    setModalViewOpen(true);
                  }}
                >
                  My Account
                </Dropdown.Item>
                <Dropdown.Item style={{ textAlign: 'center' }} onClick={() => setModalOpen(true)}>
                  My Status
                </Dropdown.Item>
                <Dropdown.Item style={{ textAlign: 'center' }} onClick={handleLogout}>
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
            <Link to="/providernotifications">
              <NotificationsActiveIcon />
              <span>Service Requests</span>
            </Link>
          </li>
         

          <li className="nav-text">
            <Link to="/providerfeedback">
              <FeedbackIcon />
              <span>Service Reviews</span>
            </Link>
          </li>
          <li className="nav-text">
            <Link to="/providerfinance">
              <AccountBalanceWalletIcon />
              <span>Finance</span>
            </Link>
          </li>

          <li className="nav-text">
            <Link to="/providerfeedbacksection">
              <ChatIcon />
              <span>Feedback Section</span>
            </Link>
          </li>

          <li className="nav-text">
            <Link to="/providercontact">
              <PermPhoneMsgIcon />
              <span>Contact</span>
            </Link>
          </li>

          <li className="nav-text">
            <Link to="/providerhome">
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

      {modalViewOpen && user && (
        <ModalView
          setOpenModal={setModalViewOpen}
          avatar={user.avatar}
          type={user.type}
          name={user.name}
          username={user.username}
          email={user.email}
        />
      )}

      {/* Modal for Online Status */}
      <Modal show={modalOpen} onHide={() => setModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Set Your Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Toggle between online and offline status:</p>
          <ToggleButton
           type="checkbox"
           variant={status === "online" ? "success" : "secondary"}
           checked={status === "online"}
           value="1"
           onClick={handleStatusChange}  // Ensure this is properly linked
          >
            {status === "online" ? "Online" : "Offline"}
          </ToggleButton>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProviderNav;
