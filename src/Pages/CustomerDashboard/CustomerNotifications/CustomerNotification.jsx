import React from 'react'
import CustomerNav from '../../../components/CustomerDashboardComponents/CustomerNav/CustomerNav'
import SubNav from '../../../components/CustomerDashboardComponents/CustomerSubNav/SubNav'
import Footer from '../../../components/Footer/Footer'
import Notification from '../../../components/CustomerDashboardComponents/CustomerNotifications/CustomerNotific'

const CustomerNotification = () => {
  return (
    <>
     <CustomerNav />
     <SubNav />
     <Notification />
     <Footer />
    </>
  )
}

export default CustomerNotification