import React from 'react'
import './ProviderHome.css'
import ProviderNav from '../../../components/ServiceProviderDashboardComponents/ProviderNavbar/ProviderNav'
import ProviderSubNav from '../../../components/ServiceProviderDashboardComponents/ProviderSubNavbar/ProviderSubNav'
import ProfilePage from '../../../components/ServiceProviderDashboardComponents/Profile/Profile'
import Footer from '../../../components/Footer/Footer'

const ProviderHome = () => {
  return (
    <>
       <ProviderNav />
       <ProviderSubNav />
       <ProfilePage />
       <Footer />
    </>
  )
}

export default ProviderHome