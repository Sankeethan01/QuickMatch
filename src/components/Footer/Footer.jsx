import React from 'react'
import './Footer.css'
import logo from '../../assets/logo.png'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer = () => {
  return (
    <>
    <div className='footer'>
      <div className='foot-left'>
        <img src={logo} alt="" className='foot-logo'/>
        
        <p>QuickMatch connects users with top service providers, ensuring seamless booking and high-quality service for a hassle-free experience.</p>
        <div className="foot-icons">
          <FacebookIcon className='foot-icon'/>
          <TwitterIcon className='foot-icon'/>
          <InstagramIcon className='foot-icon'/>
          <YouTubeIcon className='foor-icon'/>
        </div>
      </div>
      <div className='foot-mid'>
        <h4>Contact Details</h4>
          <p>quickmatch021@gmail.com</p>
          <p>0778337669</p>
        </div>
      <div className='foot-right'>
        <h4>Quick Links</h4>
        <ul>
            <li>Contact</li>
            <li>About</li>
            <li>Services</li>
            <li>Help Center</li>
        </ul></div>
        
        <p className='copy-right'>&copy; {new Date().getFullYear()} All rights Reserved</p>
    </div>
    
    </>
  )
}

export default Footer