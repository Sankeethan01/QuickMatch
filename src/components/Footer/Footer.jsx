import React from 'react'
import './Footer.css'
import logo from '../../assets/logo.png'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import mail from '../../assets/mail-icon.png';
import phone from '../../assets/phone-icon.png';
import location from '../../assets/location-icon.png';

const Footer = () => {
  return (
    <>
    <div className='footer'>
      <div className='foot-left'>
        <p>QuickMatch connects users with top service providers for seamless booking and high-quality service. Our platform offers a directory of verified professionals, user reviews, secure payments, and dedicated support. Find the right provider for any job and enjoy hassle-free, quality service at your fingertips.</p>
        
      </div>
      <div className='foot-mid'>
      <img src={logo} alt="" className='foot-logo'/>
          <div className="foot-icons">
          <FacebookIcon className='foot-icon'/>
          <TwitterIcon className='foot-icon'/>
          <InstagramIcon className='foot-icon'/>
          <YouTubeIcon className='foor-icon'/>
        </div>
        </div>
      <div className='foot-right'>
      <ul>
          <li>
            <img src={mail} alt="" />
            cst21020@gmail.com
          </li>
          <li>
            <img src={phone} alt="" />
            +77 8337 669
          </li>
          <li>
            <img src={location} alt="" />
            Courts Road, Mallakam, Jaffna, Sri Lanka.
          </li>
        </ul>
        </div>
        <p className='copy-right'>&copy; {new Date().getFullYear()} All rights Reserved</p>
    </div>
  
    
    </>
  )
};

export default Footer

