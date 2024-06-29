import React from 'react'
import './HomePage.css'
import Hero from '../../components/Hero/Hero'
import Services from '../../components/Services/Services'
import HomeNavBar from '../../components/HomeNavBar/HomeNavBar'
import Footer from '../../components/Footer/Footer'

const HomePage = () => {
  return (
    <div className='homePage'>
      <HomeNavBar />
      <Hero />
      <Services />
      <Footer />
    </div>
  )
}

export default HomePage