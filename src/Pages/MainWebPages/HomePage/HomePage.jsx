import React, { useEffect } from 'react'
import Hero from '../../../components/Hero/Hero'
import Services from '../../../components/Services/Services'
import HomeNavBar from '../../../components/HomeNavBar/HomeNavBar'
import Footer from '../../../components/Footer/Footer'
import Title from '../../../components/Title/Title'
import Functionality from '../../../components/Functionality/Functionality'
import About from '../../../components/About/About'
import Review from '../../../components/Review/Review'
import { useNavigate } from 'react-router-dom'


const HomePage = () => {
  useEffect(() => {
    if(sessionStorage.getItem('user_type') !== 'customer')
      {
           sessionStorage.clear();
            navigate('/');
      }
  })

  const navigate = useNavigate();
  
  return (
    <div className='homePage'>
      <HomeNavBar />
      <Hero />
      <Title subTitle='Our Services' title='What We Offer'/>
      <Services />
      <Title subTitle='Functionality' title='How QuickMatch Works' />
      <Functionality />
      <Title subTitle='About QuickMatch' title='Simple Intro about Us' />
      <About />
      <Title subTitle='Reviews' title='Feedbacks from Customers' />
      <Review />
      <Footer />
    </div>
  )
}

export default HomePage