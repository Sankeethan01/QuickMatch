import React from 'react'
import ProviderNav from '../../../components/ServiceProviderDashboardComponents/ProviderNavbar/ProviderNav'
import Footer from '../../../components/Footer/Footer'
import FinancePage from '../../../components/ServiceProviderDashboardComponents/Finance/Finance'

const ProviderFinance = () => {
  return (
    <>
    <ProviderNav />
    
    <FinancePage />
    <Footer />
 </>
  )
}

export default ProviderFinance