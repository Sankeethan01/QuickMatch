import React, { useEffect, useState } from 'react'
import ProviderNav from '../../../components/ServiceProviderDashboardComponents/ProviderNavbar/ProviderNav'
import Footer from '../../../components/Footer/Footer'
import { useNavigate } from 'react-router-dom'
import ProviderNotification from '../../../components/ServiceProviderDashboardComponents/Notifications/Notifications'
import notificImg from '../../../assets/notific_image.jpg';
import '../../CustomerDashboard/CustomerNotifications/CustomerNotification.css';
import logo from '../../../assets/logo.png';

const ProviderNotifications = () => {
   
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      if(sessionStorage.getItem('user_type') !== 'provider')
        {
             sessionStorage.clear();
              navigate('/');
        }
    }, 2000);
  })

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

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
       <ProviderNav />
       <div className='notification-section'>
      <div className='notification-content'>
      <ProviderNotification />
      </div>
      <div className='notification-image'>
        <img src={notificImg}/>
      </div>
     </div>
       
       <Footer />
    </>
  )
}

export default ProviderNotifications