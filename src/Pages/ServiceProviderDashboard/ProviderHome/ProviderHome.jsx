import React, { useEffect } from 'react'
import ProviderNav from '../../../components/ServiceProviderDashboardComponents/ProviderNavbar/ProviderNav'
import ProfilePage from '../../../components/ServiceProviderDashboardComponents/Profile/Profile'
import Footer from '../../../components/Footer/Footer'
import { useNavigate } from 'react-router-dom'

const ProviderHome = () => {
  
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
       <ProfilePage />
       <Footer />
    </>
  )
}

export default ProviderHome