import React from 'react'
import ProviderNav from '../../../components/ServiceProviderDashboardComponents/ProviderNavbar/ProviderNav'
import ProviderSubNav from '../../../components/ServiceProviderDashboardComponents/ProviderSubNavbar/ProviderSubNav'
import Footer from '../../../components/Footer/Footer'
import FinancePage from '../../../components/ServiceProviderDashboardComponents/Finance/Finance'

const ProviderFinance = () => {
  return (
    <>
    <ProviderNav />
    <ProviderSubNav />
    <FinancePage />
    <Footer />
 </>
  )
}

export default ProviderFinance