import React from 'react'
import './Hero.css'

import Carousel from 'react-bootstrap/Carousel';
import hero2 from '../../assets/hero2.jpg'
import hero3 from '../../assets/hero3.jpg'

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
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque facilis praesentium in reiciendis recusandae ea necessitatibus error repellendus, voluptatum pariatur saepe quasi, cumque nam eligendi laborum fugiat, dolor sed dolore.</p>
            <button className="btn">Explore More</button>
         </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
      <div className='intro'>
        <img  src={hero2}  alt=''/>
        <div className="hero-text">
            <h2 className="title">QuickMatch</h2>
            <h1>We Find You better Services</h1>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque facilis praesentium in reiciendis recusandae ea necessitatibus error repellendus, voluptatum pariatur saepe quasi, cumque nam eligendi laborum fugiat, dolor sed dolore.</p>
            <button className="btn">Explore More</button>
         </div>
        </div>
      </Carousel.Item>
    </Carousel>
    </div>
  )
}

export default Hero