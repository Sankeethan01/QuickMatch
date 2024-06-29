import React from 'react'
import ProviderNav from '../../../components/ServiceProviderDashboardComponents/ProviderNavbar/ProviderNav'
import ProviderSubNav from '../../../components/ServiceProviderDashboardComponents/ProviderSubNavbar/ProviderSubNav'
import Footer from '../../../components/Footer/Footer'
import Notification from '../../../components/ServiceProviderDashboardComponents/Notifications/Notifications'

const ProviderNotifications = () => {
  return (
    <>
       <ProviderNav />
       <ProviderSubNav />
       <Notification />
       <Footer />
    </>
  )
}

export default ProviderNotifications