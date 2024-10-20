import React, { useEffect, useState } from "react";
import Profile from "../../../components/CustomerDashboardComponents/ProfileCustomer/Profile";
import Footer from "../../../components/Footer/Footer";
import HomeNavBar from "../../../components/HomeNavBar/HomeNavBar";
import { useNavigate } from "react-router-dom";
import logo from '../../../assets/logo.png';
import profileImg from '../../../assets/profile_sectio n.jpg'
import './CustomerMain.css';

const CustomerMain = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      if (sessionStorage.getItem('user_type') !== 'customer') {
        sessionStorage.clear();
        navigate('/');
    }
    }, 1000);
   
}, [navigate]);

if (loading) {
  return (
    <div className="loading">
      <img src={logo} alt="" />
      <h4>Loading......</h4>
    </div>
  );
}

  return (
    <>
      <HomeNavBar />
      <div className="profile-section">
        <div className="profileImage-section">
          <img src={profileImg} alt="profile-img"/>
        </div>
        <div className="profile-content">
        <Profile />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CustomerMain;
