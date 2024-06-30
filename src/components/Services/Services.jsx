import React from 'react'
import './Service.css'
import service1 from '../../assets/service1.jpg'
import service2 from '../../assets/service2.jpg'
import service3 from '../../assets/service3.jpg'
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import FestivalOutlinedIcon from '@mui/icons-material/FestivalOutlined';

const Services = () => {
  return (
    <div className="services">
    <div className="program">
       <img src={service1} alt="" />
       <div className="caption">
           <ElectricBoltIcon className='service-icon'/>
           <p>Electric & Electronics</p>
       </div>
    </div>
    <div className="program">
       <img src={service2} alt="" />
       <div className="caption">
           <EngineeringOutlinedIcon className='service-icon'/>
           <p>Construction</p>
       </div>
    </div>
    <div className="program">
       <img src={service3} alt="" />
       <div className="caption">
       <FestivalOutlinedIcon className='service-icon'/>
           <p>Event Management</p>
       </div>
    </div>
   </div>
  )
}

export default Services