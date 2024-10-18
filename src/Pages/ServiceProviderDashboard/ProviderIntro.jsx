import React, { useEffect, useState } from 'react'
import Hero from '../../components/Hero/Hero'
import Services from '../../components/Services/Services'
import Functionality from '../../components/Functionality/Functionality'
import About from '../../components/About/About'
import Review from '../../components/Review/Review'
import Footer from '../../components/Footer/Footer'
import ProviderNav from '../../components/ServiceProviderDashboardComponents/ProviderNavbar/ProviderNav'
import Title from '../../components/Title/Title'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png';

const ProviderIntro = () => {

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      if(sessionStorage.getItem('user_type') !== 'provider')
        {
             sessionStorage.clear();
              navigate('/');
        }
    }, 2000);
    
  })


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
    <div className='homePage'>
      <ProviderNav />
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

export default ProviderIntro