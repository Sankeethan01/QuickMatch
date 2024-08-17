import React, { useEffect } from 'react'
import Footer from '../../../components/Footer/Footer'
import Notification from '../../../components/CustomerDashboardComponents/CustomerNotifications/CustomerNotific'
import HomeNavBar from '../../../components/HomeNavBar/HomeNavBar'
import { useNavigate } from 'react-router-dom'

const CustomerNotification = () => {

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
     <Notification />
     <Footer />
    </>
  )
}

export default CustomerNotification