import React from 'react'
import './ContactPage.css'
import HomeNavBar from '../../components/HomeNavBar/HomeNavBar'
import Contact from '../../components/Contact/Contact'
import Footer from '../../components/Footer/Footer'

const ContactPage = () => {
  return (
    <div className='contact-page'>
        <HomeNavBar />
        <Contact />
        <Footer />
    </div>
  )
}

export default ContactPage