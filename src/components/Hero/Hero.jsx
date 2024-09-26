import React, { useEffect, useState } from 'react'
import './Hero.css'

import Carousel from 'react-bootstrap/Carousel';
import hero from '../../assets/hero.png';
import s1 from '../../assets/s1.jpg';
import s2 from '../../assets/s2.jpg';
import s3 from '../../assets/s3.jpg';
import s4 from '../../assets/s4.png';
import s5 from '../../assets/s5.png';

const Hero = () => {

  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 200) {  // Adjust the scroll threshold as needed
        setFadeOut(true);     // Trigger fade-out when user scrolls down 200px
      } else {
        setFadeOut(false);    // Reset the fade-out if user scrolls back up
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
    <div className='carousel'>
      <Carousel fade interval={3000} controls={false}>
        <Carousel.Item >
            <img src={hero} alt='' />
        </Carousel.Item>
        <Carousel.Item>
            <img src={s1} alt='' />
        </Carousel.Item>
        <Carousel.Item>
            <img src={s2} alt='' />
        </Carousel.Item>
        <Carousel.Item>
            <img src={s3} alt='' />
        </Carousel.Item>
        <Carousel.Item>
            <img src={s4} alt='' />
        </Carousel.Item>
        <Carousel.Item>
            <img src={s5} alt='' />
        </Carousel.Item>
      </Carousel>
    </div>
    <div className={`hero-text ${fadeOut ? 'fade-out' : ''}`}>
              <h2 className="title">QuickMatch</h2>
              <h1>We Find You better Services</h1>
              <p>QuickMatch is a web app that helps users find the best service providers for three categories. Users can browse, compare, and book their preferred providers, ensuring they receive top-quality service efficiently and conveniently. Enjoy a smooth, hassle-free experience with QuickMatch.</p>
              <button className="btn">Explore More</button>
            </div>
    </>
  )
}

export default Hero
