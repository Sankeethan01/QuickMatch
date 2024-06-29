import React from 'react'
import ProviderNav from '../../../components/ServiceProviderDashboardComponents/ProviderNavbar/ProviderNav'
import ProviderSubNav from '../../../components/ServiceProviderDashboardComponents/ProviderSubNavbar/ProviderSubNav'
import Footer from '../../../components/Footer/Footer'
import Feedback from '../../../components/ServiceProviderDashboardComponents/Feedback/Feedback'

const ProviderFeedback = () => {
  return (
    <>
       <ProviderNav />
       <ProviderSubNav />
       <Feedback />
       <Footer />
    </>
  )
}

export default ProviderFeedback