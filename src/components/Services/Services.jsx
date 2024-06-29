import React from 'react'
import './Service.css'
import service1 from '../../assets/service1.jpg'
import service2 from '../../assets/service2.jpg'
import service3 from '../../assets/service3.jpg'
import service1icon from '../../assets/service1icon.png'
import service2icon from '../../assets/service2icon.png'
import service3icon from '../../assets/service3icon.png'

const Services = () => {
  return (
    <div className="services">
    <div className="program">
       <img src={service1} alt="" />
       <div className="caption">
           <img src={service1icon} alt="" />
           <p>Electric & Electronics</p>
       </div>
    </div>
    <div className="program">
       <img src={service2} alt="" />
       <div className="caption">
           <img src={service2icon} alt="" />
           <p>Construction</p>
       </div>
    </div>
    <div className="program">
       <img src={service3} alt="" />
       <div className="caption">
           <img src={service3icon} alt="" />
           <p>Event Management</p>
       </div>
    </div>
   </div>
  )
}

export default Services