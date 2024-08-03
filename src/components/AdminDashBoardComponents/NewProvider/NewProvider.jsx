import React, { useEffect, useState } from 'react';
import './NewProvider.css'
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../../../assets/logo.png'

const NewProvider = () => {

  const [newProviders, setNewProviders] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    fetchNewProviders();
  }, []);

  const fetchNewProviders = async () => {
    try {
      const response = await axios.get("http://localhost/quickmatch_api/providerDetails.php?action=lastFive");
      setNewProviders(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching new providers: ", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <img src={logo} alt="" />
        <h4>Loading...</h4>
      </div>
    );
  }


  return (
    <div className='new-provider'>  
        <span className="widgetSmTitle">New Service Providers</span>
    <ul className="widgetSmList">
        
    {newProviders.map(provider => (
          <li key={provider.user_id} className="widgetSmListItem">
            <div className='new-user-img'>
              <img
                src={`http://localhost/quickmatch_api/profile_images/${provider.profile_image}`}
                alt=""
                className="widgetSmImg"
              />
              <span className="widgetSmUsername">{provider.name}</span>
            </div>
            <span className="widgetSmUserTitle">{provider.user_type}</span>
            <button className="widgetSmButton">
              <Link to="/admincustomerlist" className='link'>
                <ZoomInIcon className='zoom-icon' /> View
              </Link>
            </button>
          </li>
        ))}
   </ul></div>
  )
}

export default NewProvider