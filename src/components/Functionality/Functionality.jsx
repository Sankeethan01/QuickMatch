import React from 'react'
import './Functionality.css'
import choosing from '../../assets/choose.png'
import selecting from '../../assets/select.png'
import booking from '../../assets/booking.png'

const Functionality = () => {
  return (
    <div className='functionality'>
        <div className='function'>
           <div className='function-text'>
            <img src={choosing} alt='' />
                <h3>Select a service</h3>
                <p>Select a service category for getting services.</p>
            </div>
            <div className='function-num'>1</div>
        </div>
        <div className='function'>
        
            <div className='function-text'>
            <img src={selecting} alt='' />
                <h3>Choose a provider</h3>
                <p>Find a provider according to your wish.</p>
            </div>
            <div className='function-num'>2</div>
        </div>
        <div className='function'>
        
            <div className='function-text'>
            <img src={booking} alt='' />
                <h3>Book for the Service</h3>
                <p>Books the provider for getting services.</p>
            </div>
            <div className='function-num'>3</div>
        </div>
    </div>
  )
}

export default Functionality