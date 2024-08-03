import React from 'react'
import './PopupProvider.css'
import ClearIcon from "@mui/icons-material/Clear";

const PopupProvider = ({ data, onclose }) => {




  return (
    <div className='popup-provider' open onclose={onclose}>
        <div className="popup-box">
        <div className="titleCloseBtn">
          <ClearIcon className="cancel-btn" onClick={onclose} />
        </div>
        <div className="title">
          <h3>Provider Details</h3>
          <p>Provider Id : {data.id}</p>
          <p>Username : {data.username}</p>
        </div>
        <div className='body'>
        <p className="small-head">Required Details</p>
        <div className='info'>
        <img src={`http://localhost/quickmatch_api/profile_images/${data.profile_image}`} alt="" />
        
        <div className=''>
        <h5>{data.name}</h5>
         
          <p>{data.email}</p>
          <p>{data.service_category}</p>
        </div>
        </div>
        </div>
        
        <div className="body">
          <p className="small-head">Additional Details</p>
          <p>Address : {data.address}</p>
          <p>Status : {data.status ? 'Online' : 'Offline'}</p>
          
          
        </div>
        <div className="body-more">
          <p className="small-head">More Details</p>
          <p>Description : {data.description}</p>
          <p>Services : {data.services}</p>
          <p>Qualification : {data.qualification}</p>
          <p>Charge : {data.charge}</p>
          
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

export default PopupProvider