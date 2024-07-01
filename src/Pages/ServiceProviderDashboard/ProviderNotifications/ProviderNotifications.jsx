import React from 'react'
import ProviderNav from '../../../components/ServiceProviderDashboardComponents/ProviderNavbar/ProviderNav'
import Footer from '../../../components/Footer/Footer'
import Notification from '../../../components/ServiceProviderDashboardComponents/Notifications/Notifications'

const ProviderNotifications = () => {
  return (
    <>
       <ProviderNav />
    
       <Notification />
       <Footer />
    </>
  )
}

export default ProviderNotifications