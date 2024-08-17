import React, { useEffect } from "react";
import Profile from "../../../components/CustomerDashboardComponents/ProfileCustomer/Profile";
import Footer from "../../../components/Footer/Footer";
import HomeNavBar from "../../../components/HomeNavBar/HomeNavBar";
import { useNavigate } from "react-router-dom";

const CustomerMain = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('user_type') !== 'customer') {
        sessionStorage.clear();
        navigate('/');
    }
}, [navigate]);

 

  return (
    <>
      <HomeNavBar />
      <Profile />
      <Footer />
    </>
  );
};

export default CustomerMain;
