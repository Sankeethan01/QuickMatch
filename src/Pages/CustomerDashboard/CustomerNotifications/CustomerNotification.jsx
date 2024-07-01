import React from 'react'
import Footer from '../../../components/Footer/Footer'
import Notification from '../../../components/CustomerDashboardComponents/CustomerNotifications/CustomerNotific'
import HomeNavBar from '../../../components/HomeNavBar/HomeNavBar'

const CustomerNotification = () => {
  return (
    <>
     <HomeNavBar />
     <Notification />
     <Footer />
    </>
  )
}

export default CustomerNotification