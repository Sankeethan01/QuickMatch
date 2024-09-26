import React, { useEffect } from 'react'
import ProviderNav from '../../../components/ServiceProviderDashboardComponents/ProviderNavbar/ProviderNav'
import Footer from '../../../components/Footer/Footer'
import { useNavigate } from 'react-router-dom'
import ProviderNotification from '../../../components/ServiceProviderDashboardComponents/Notifications/Notifications'

const ProviderNotifications = () => {
   
  useEffect(() => {
    if(sessionStorage.getItem('user_type') !== 'provider')
      {
           sessionStorage.clear();
            navigate('/');
      }
  })

  const navigate = useNavigate();


  return (
    <>
       <ProviderNav />
       <ProviderNotification />
       <Footer />
    </>
  )
}

export default ProviderNotifications