import React, { useState } from 'react'
import './IntroPage.css'
import NavigationBar from '../../components/NavBar/NavBar'
import Hero from '../../components/Hero/Hero'
import Title from '../../components/Title/Title'
import Services from '../../components/Services/Services'
import Functionality from '../../components/Functionality/Functionality'
import About from '../../components/About/About'
import Review from '../../components/Review/Review'
import Contact from '../../components/Contact/Contact'
import Footer from '../../components/Footer/Footer'

const IntroPage = () => {

  

  return (
    <div className='intro-page'>
      <NavigationBar />
      <Hero />
      <Title subTitle='Our Services' title='What We Offer' />
      <Services />
      <Title subTitle='Functionality' title='How QuickMatch Works' />
      <Functionality />
      <Title subTitle='About QuickMatch' title='Simple Intro about Us' />
      <About />
      <Title subTitle='Reviews' title='Feedbacks from Customers' />
      <Review />
      <Title subTitle='Contact Us' title='Anyone can contact' />
      <Contact />
      <Footer />
    </div>
  )
}

export default IntroPage