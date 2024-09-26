import React, { useEffect, useState } from 'react'
import './ContactPage.css'
import HomeNavBar from '../../../components/HomeNavBar/HomeNavBar'
import Contact from '../../../components/Contact/Contact'
import Footer from '../../../components/Footer/Footer'
import { useNavigate } from 'react-router-dom'
import logo from '../../../assets/logo.png';

const ContactPage = () => {

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      if(sessionStorage.getItem('user_type') !== 'customer')
        {
             sessionStorage.clear();
              navigate('/');
        }
    }, 1500);
    
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
    <div className='contact-page'>
        <HomeNavBar />
        <h1 style={{textAlign:'center',
          marginTop:100,
          fontWeight:'bold',
          marginBottom:0
        }}>Feel Free and Contact Us</h1>
        <Contact />
        <Footer />
    </div>
  )
}

export default ContactPage