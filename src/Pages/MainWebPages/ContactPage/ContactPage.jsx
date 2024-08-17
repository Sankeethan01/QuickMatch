import React, { useEffect } from 'react'
import './ContactPage.css'
import HomeNavBar from '../../../components/HomeNavBar/HomeNavBar'
import Contact from '../../../components/Contact/Contact'
import Footer from '../../../components/Footer/Footer'
import { useNavigate } from 'react-router-dom'

const ContactPage = () => {

  useEffect(() => {
    if(sessionStorage.getItem('user_type') !== 'customer')
      {
           sessionStorage.clear();
            navigate('/');
      }
  })

  const navigate = useNavigate();

  return (
    <div className='contact-page'>
        <HomeNavBar />
        <Contact />
        <Footer />
    </div>
  )
}

export default ContactPage