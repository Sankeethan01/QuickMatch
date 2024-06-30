import React from 'react'
import './Hero.css'

import Carousel from 'react-bootstrap/Carousel';
import hero3 from '../../assets/hero3.jpg'
import hero1 from '../../assets/hero1.jpg'

const Hero = () => {
  return (
    <div className='carousel'>
    <Carousel fade>
      <Carousel.Item>
        <div className='intro'>
        <img  src={hero3}  alt=''/>
        <div className="hero-text">
          <h2 className="title">QuickMatch</h2>
            <h1>We Find You better Services</h1>
            <p>QuickMatch is a web app that helps users find the best service providers for three categories. Users can browse, compare, and book their preferred providers, ensuring they receive top-quality service efficiently and conveniently. Enjoy a smooth, hassle-free experience with QuickMatch.</p>
            <button className="btn">Explore More</button>
         </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
      <div className='intro'>
        <img  src={hero1}  alt=''/>
        <div className="hero-text">
            <h2 className="title">QuickMatch</h2>
            <h1>We Find You better Services</h1>
            <p>QuickMatch is a web app that helps users find the best service providers for three category. Users can browse, compare, and book their preferred providers, ensuring they receive top-quality service efficiently and conveniently. Enjoy a smooth, hassle-free experience with QuickMatch.</p>
            <button className="btn">Explore More</button>
         </div>
        </div>
      </Carousel.Item>
    </Carousel>
    </div>
  )
}

export default Hero