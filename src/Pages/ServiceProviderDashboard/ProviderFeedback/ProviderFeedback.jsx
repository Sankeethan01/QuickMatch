import React, { useEffect } from 'react'
import ProviderNav from '../../../components/ServiceProviderDashboardComponents/ProviderNavbar/ProviderNav'
import Footer from '../../../components/Footer/Footer'
import Feedback from '../../../components/ServiceProviderDashboardComponents/Feedback/Feedback'
import { useNavigate } from 'react-router-dom'

const ProviderFeedback = () => {
 
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
       <Feedback />
       <Footer />
    </>
  )
}

export default ProviderFeedback