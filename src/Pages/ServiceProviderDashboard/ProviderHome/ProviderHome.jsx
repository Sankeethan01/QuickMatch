import React from 'react'
import ProviderNav from '../../../components/ServiceProviderDashboardComponents/ProviderNavbar/ProviderNav'
import ProfilePage from '../../../components/ServiceProviderDashboardComponents/Profile/Profile'
import Footer from '../../../components/Footer/Footer'

const ProviderHome = () => {
  return (
    <>
       <ProviderNav />
       <ProfilePage />
       <Footer />
    </>
  )
}

export default ProviderHome