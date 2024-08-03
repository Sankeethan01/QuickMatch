import React from 'react'
import './PopupCustomer.css'
import ClearIcon from "@mui/icons-material/Clear";

const PopupCustomer = ({ data, onclose }) => {
  return (
    <div className='popup-customer' open onclose={onclose}>
      <div className="popup-box">
        <div className="titleCloseBtn">
          <ClearIcon className="cancel-btn" onClick={onclose} />
        </div>
        <div className="title">
          <h3>Customer Details</h3>
          <p>Customer Id : {data.id}</p>
          <p>Username : {data.username}</p>
        </div>
        <div className='body'>
        <p className="small-head">Required Details</p>
        <div className='info'>
        <img src={`http://localhost/quickmatch_api/profile_images/${data.profile_image}`} alt="" />
        
        <div className=''>
        <h5>{data.name}</h5>
         
          <p>{data.email}</p>
        </div>
        </div>
        </div>
        
        <div className="body">
          <p className="small-head">Additional Details</p>
          
          <p>Contact No : {data.phone}</p>
          
          <p>National ID : {data.national_id}</p>
          <p>Address : {data.address}</p>
        </div>
        <div className="footer-btn">
          <button onClick={onclose} id="cancelBtn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default PopupCustomer
