import React, { useEffect, useState } from 'react'
import Footer from '../../../components/Footer/Footer'
import Notification from '../../../components/CustomerDashboardComponents/CustomerNotifications/CustomerNotific'
import HomeNavBar from '../../../components/HomeNavBar/HomeNavBar'
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import notificImg from '../../../assets/notific_image.jpg';


const CustomerNotification = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      if (sessionStorage.getItem('user_type') !== 'customer') {
        sessionStorage.clear();
        navigate('/');
      }
    }, 2000);

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
        <Notification />
      <Footer />
    </>
  )
}

export default CustomerNotification