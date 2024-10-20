import React, { useEffect, useState } from 'react'
import ProviderNav from '../../../components/ServiceProviderDashboardComponents/ProviderNavbar/ProviderNav'
import Footer from '../../../components/Footer/Footer'
import Feedback from '../../../components/ServiceProviderDashboardComponents/Feedback/Feedback'
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.png';

const ProviderFeedback = () => {
 
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      if(sessionStorage.getItem('user_type') !== 'provider')
        {
             sessionStorage.clear();
              navigate('/');
        }
    }, 1000);
  })

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <div className="loading">
        <img src={logo} alt="" />
        <h4>Loading......</h4>
      </div>
    );
  }


  return (
    <>
       <ProviderNav />
       <Feedback />
       <Footer />
    </>
  )
}

export default ProviderFeedback