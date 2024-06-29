import React from 'react'
import './NewUsers.css'
import user_img from '../../../assets/user-2.png'
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { Link } from 'react-router-dom';

const NewUsers = (props) => {
  return (
    <div className='new-users'>
    <span className="widgetSmTitle">{props.title}</span>
     <ul className="widgetSmList">
      <li className="widgetSmListItem">
        <div className='new-user-img'>
        <img
          src={user_img}
          alt=""
          className="widgetSmImg"
        />
          <span className="widgetSmUsername">Ainkaran</span>
        </div>
       
          <span className="widgetSmUserTitle">{props.job}</span>
        <button className="widgetSmButton">
        <Link to="/admincustomerlist" className='link'><ZoomInIcon className='zoom-icon' /> View</Link>
        </button>
      </li>
      <li className="widgetSmListItem">
      <div className='new-user-img'>
        <img
          src={user_img}
          alt=""
          className="widgetSmImg"
        />
          <span className="widgetSmUsername">Abarna</span>
        </div>
          <span className="widgetSmUserTitle">{props.job}</span>
        <button className="widgetSmButton">
        <Link to="/admincustomerlist" className='link'><ZoomInIcon className='zoom-icon' /> View</Link>
        </button>
      </li>
      <li className="widgetSmListItem">
      <div className='new-user-img'>
        <img
          src={user_img}
          alt=""
          className="widgetSmImg"
        />
          <span className="widgetSmUsername">Joyson</span>
        </div>
          <span className="widgetSmUserTitle">{props.job}</span>
        <button className="widgetSmButton">
        <Link to="/admincustomerlist" className='link'><ZoomInIcon className='zoom-icon' /> View</Link>
        </button>
      </li>
      <li className="widgetSmListItem">
      <div className='new-user-img'>
        <img
          src={user_img}
          alt=""
          className="widgetSmImg"
        />
          <span className="widgetSmUsername">Elavanya</span>
        </div>
          <span className="widgetSmUserTitle">{props.job}</span>
        <button className="widgetSmButton">
        <Link to="/admincustomerlist" className='link'><ZoomInIcon className='zoom-icon' /> View</Link>
        </button>
      </li>
      <li className="widgetSmListItem">
      <div className='new-user-img'>
        <img
          src={user_img}
          alt=""
          className="widgetSmImg"
        />
          <span className="widgetSmUsername">Nivethan</span>
        </div>
          <span className="widgetSmUserTitle">{props.job}</span>
        <button className="widgetSmButton">
        <Link to="/admincustomerlist" className='link'><ZoomInIcon className='zoom-icon' /> View</Link>
        </button>
      </li>
    </ul></div>
  )
}

export default NewUsers