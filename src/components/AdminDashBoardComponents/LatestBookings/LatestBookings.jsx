import React from 'react'
import './LatestBookings.css'
import user_icon from '../../../assets/user-3.png'

const LatestBookings = () => {

    const Button = ({ type }) => {
        return <button className={"widgetLgButton " + type}>{type}</button>;
      };

  return (
    <div className='latest-bookings'>
        <h3 className="widgetLgTitle">Latest Service Bookings</h3>
    <table className="widgetLgTable">
      <tr className="widgetLgTr">
        <th className="widgetLgTh">Customer</th>
        <th className="widgetLgTh one" >Date of Booking</th>
        <th className="widgetLgTh one">Service Name</th>
        <th className="widgetLgTh">Status of Service</th>
      </tr>
      <tr className="widgetLgTr">
        <td className="widgetLgUser">
          <img
            src={user_icon}
            alt=""
            className="widgetLgImg"
          />
          <span className="widgetLgName">Deluxshana</span>
        </td>
        <td className="widgetLgDate">22 Jun 2024</td>
        <td className="widgetLgAmount">Electronic Repair</td>
        <td className="widgetLgStatus">
          <Button type="Pending" />
        </td>
      </tr>
      <tr className="widgetLgTr">
        <td className="widgetLgUser">
          <img
            src={user_icon}
            alt=""
            className="widgetLgImg"
          />
          <span className="widgetLgName">Udara Manula</span>
        </td>
        <td className="widgetLgDate">18 Jun 2024</td>
        <td className="widgetLgAmount">Birthday Function</td>
        <td className="widgetLgStatus">
          <Button type="Accepted" />
        </td>
      </tr>
      <tr className="widgetLgTr">
        <td className="widgetLgUser">
          <img
            src={user_icon}
            alt=""
            className="widgetLgImg"
          />
          <span className="widgetLgName">Sankeethan</span>
        </td>
        <td className="widgetLgDate">17 Jun 2024</td>
        <td className="widgetLgAmount">Painting Works</td>
        <td className="widgetLgStatus">
          <Button type="Declined" />
        </td>
      </tr>
      <tr className="widgetLgTr">
        <td className="widgetLgUser">
          <img
            src={user_icon}
            alt=""
            className="widgetLgImg"
          />
          <span className="widgetLgName">Thanujan</span>
        </td>
        <td className="widgetLgDate">15 Jun 2024</td>
        <td className="widgetLgAmount">Wiring Works</td>
        <td className="widgetLgStatus">
          <Button type="Completed" />
        </td>
      </tr>
    </table></div>
  )
}

export default LatestBookings