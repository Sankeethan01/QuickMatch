import React from 'react'
import './ServiceTitle.css'

const ServiceTitle = ({title}) => {
  return (
    <div className='service-title'>
        <h1 className='service-name'>{title} <span>Services</span></h1>
    </div>
  )
}

export default ServiceTitle