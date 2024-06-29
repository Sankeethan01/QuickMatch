import React from 'react'
import './NewProvider.css'
import user_img from '../../../assets/user-4.png'
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { Link } from 'react-router-dom';

const NewProvider = () => {
  return (
    <div className='new-provider'>  
        <span className="widgetSmTitle">New Service Providers</span>
    <ul className="widgetSmList">
        
     <li className="widgetSmListItem">
     <div className='new-user-img'>
       <img
         src={user_img}
         alt=""
         className="widgetSmImg"
       />
         <span className="widgetSmUsername">Abiraj</span>
         </div>
         <span className="widgetSmUserTitle">Contractor</span>
       <button className="widgetSmButton">
        <Link to="/adminproviderlist" className='link'><ZoomInIcon className='zoom-icon' /> View</Link>
         
       </button>
     </li>
     <li className="widgetSmListItem">
     <div className='new-user-img'>
       <img
         src={user_img}
         alt=""
         className="widgetSmImg"
       />
         <span className="widgetSmUsername">Vithusan</span></div>
         <span className="widgetSmUserTitle">Electrician</span>
       <button className="widgetSmButton">
       <Link to="/adminproviderlist" className='link'><ZoomInIcon className='zoom-icon' /> View</Link>
       </button>
     </li>
     <li className="widgetSmListItem">
     <div className='new-user-img'>
       <img
         src={user_img}
         alt=""
         className="widgetSmImg"
       />
         <span className="widgetSmUsername">Abiram</span></div>
         <span className="widgetSmUserTitle">Event Co-ordinator</span>
       <button className="widgetSmButton">
       <Link to="/adminproviderlist" className='link'><ZoomInIcon className='zoom-icon' /> View</Link>
       </button>
     </li>
     <li className="widgetSmListItem">
     <div className='new-user-img'>
       <img
         src={user_img}
         alt=""
         className="widgetSmImg"
       />
         <span className="widgetSmUsername">Sarujanan</span></div>
         <span className="widgetSmUserTitle">AC mechanic</span>
       <button className="widgetSmButton">
       <Link to="/adminproviderlist" className='link'><ZoomInIcon className='zoom-icon' /> View</Link>
       </button>
     </li>
     <li className="widgetSmListItem">
     <div className='new-user-img'>
       <img
         src={user_img}
         alt=""
         className="widgetSmImg"
       />
         <span className="widgetSmUsername">Krishnaraj</span>
         </div>
         <span className="widgetSmUserTitle">Painting</span>
       <button className="widgetSmButton">
       <Link to="/adminproviderlist" className='link'><ZoomInIcon className='zoom-icon' /> View</Link>
       </button>
     </li>
   </ul></div>
  )
}

export default NewProvider