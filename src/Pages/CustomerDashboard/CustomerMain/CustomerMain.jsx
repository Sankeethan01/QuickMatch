import React from "react";
import Profile from "../../../components/CustomerDashboardComponents/ProfileCustomer/Profile";
import Footer from "../../../components/Footer/Footer";
import HomeNavBar from "../../../components/HomeNavBar/HomeNavBar";

const CustomerMain = () => {
  return (
    <>
      <HomeNavBar />
      <Profile />
      <Footer />
    </>
  );
};

export default CustomerMain;
