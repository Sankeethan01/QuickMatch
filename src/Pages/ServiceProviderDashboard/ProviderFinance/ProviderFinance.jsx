import React, { useEffect } from 'react'
import ProviderNav from '../../../components/ServiceProviderDashboardComponents/ProviderNavbar/ProviderNav'
import Footer from '../../../components/Footer/Footer'
import FinancePage from '../../../components/ServiceProviderDashboardComponents/Finance/Finance'
import { useNavigate } from 'react-router-dom'

const ProviderFinance = () => {
   
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
    
    <FinancePage />
    <Footer />
 </>
  )
}

export default ProviderFinance