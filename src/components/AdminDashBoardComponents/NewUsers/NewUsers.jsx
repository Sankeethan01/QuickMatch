import React, { useEffect, useState } from 'react';
import './NewUsers.css'
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../../../assets/logo.png'

const NewUsers = () => {

  const [newCustomers, setNewCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNewCustomers();
  }, []);


  const fetchNewCustomers = async () => {
    try {
      const response = await axios.get("http://localhost/quickmatch_api/getLastFiveUsers.php?user_type=customer");
      setNewCustomers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching new customers: ", error);
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
    <div className='new-users'>
    <span className="widgetSmTitle">New Customers</span>
     <ul className="widgetSmList">
     {newCustomers.map(customer => (
          <li key={customer.user_id} className="widgetSmListItem">
            <div className='new-user-img'>
              <img
                src={`http://localhost/quickmatch_api/profile_images/${customer.profile_image}`}
                alt=""
                className="widgetSmImg"
              />
              <span className="widgetSmUsername">{customer.name}</span>
            </div>
            <span className="widgetSmUserTitle">{customer.user_type}</span>
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

export default NewUsers