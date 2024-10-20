import React, { useEffect, useState } from 'react'
import ProviderNav from '../../../components/ServiceProviderDashboardComponents/ProviderNavbar/ProviderNav'
import Footer from '../../../components/Footer/Footer'
import Contact from '../../../components/Contact/Contact'
import { useNavigate } from 'react-router-dom'
import logo from '../../../assets/logo.png';

const ProviderContact = () => {
  
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
        <h1 style={{textAlign:'center',
          marginTop:100,
          fontWeight:'bold',
          marginBottom:0
        }}>Feel Free and Contact Us</h1>
       <Contact />
       <Footer />
    </>
  )
}

export default ProviderContact