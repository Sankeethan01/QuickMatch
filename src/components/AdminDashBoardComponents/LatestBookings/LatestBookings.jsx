import React, { useEffect, useState } from 'react'
import './LatestBookings.css'
import axios from 'axios';
import logo from '../../../assets/logo.png'

const LatestBookings = () => {

  const [newBooking, setNewBooking] = useState([]);
  const [loading, setLoading] = useState(true); 


  useEffect(() => {
    fetchNewBooking();
  }, []);

  const fetchNewBooking = async () => {
    try {
      const response = await axios.get("http://localhost/quickmatch_api/bookingDetails.php?action=lastFour");
      setNewBooking(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching new booking: ", error);
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

    const Button = ({ type }) => {
        return <button className={"widgetLgButton " + type}>{type}</button>;
      };

  return (
    <div className='latest-bookings'>
      <h3 className='widgetLgTitle'>Latest Service Bookings</h3>
      <table className='widgetLgTable'>
        <thead>
          <tr className='widgetLgTr'>
            <th className='widgetLgTh'>Customer</th>
            <th className='widgetLgTh one'>Date of Booking</th>
            <th className='widgetLgTh one'>Service Name</th>
            <th className='widgetLgTh'>Status of Service</th>
          </tr>
        </thead>
        <tbody>
          {newBooking.map((booking) => (
            <tr className='widgetLgTr' key={booking.booking_id}>
              <td className='widgetLgUser'>
                <img src={`http://localhost/quickmatch_api/profile_images/${booking.profile_image}`} alt='' className='widgetLgImg' />
                <span className='widgetLgName'>{booking.customer_name}</span>
              </td>
              <td className='widgetLgDate'>{new Date(booking.booking_date).toLocaleDateString()}</td>
              <td className='widgetLgAmount'>{booking.service_category}</td>
              <td className='widgetLgStatus'>
                <Button type={booking.booking_status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LatestBookings