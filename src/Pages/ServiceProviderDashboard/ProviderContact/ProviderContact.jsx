import React, { useEffect } from 'react'
import ProviderNav from '../../../components/ServiceProviderDashboardComponents/ProviderNavbar/ProviderNav'
import Footer from '../../../components/Footer/Footer'
import Contact from '../../../components/Contact/Contact'
import { useNavigate } from 'react-router-dom'

const ProviderContact = () => {
  
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
       <Contact />
       <Footer />
    </>
  )
}

export default ProviderContact