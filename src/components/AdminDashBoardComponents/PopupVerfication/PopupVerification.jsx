import React from 'react'
import './PopupVerification.css'
import ClearIcon from "@mui/icons-material/Clear";

const PopupVerification = ({ data, onclose }) => {
  return (
    <div className='popup-verify' open onclose={onclose}>
          <div className="popup-box">
        <div className="titleCloseBtn">
          <ClearIcon className="cancel-btn" onClick={onclose} />
        </div>
        <div className="title">
          <h3>Verification Details</h3>
          <p>Verification Id : {data.id}</p>
        </div>
        <div className='body'>
        <p className="small-head">Required Details</p>
        <div className='info'>
        
        
       
        <p>Name: {data.provider}</p>
         <p>Email : {data.email} </p>
          <p>Service : {data.service}</p>
          <p>Registered : {data.date}</p>
        </div>
        </div>
        
        <div className="body">
          <p className="small-head">Additional Details</p>
          
          <p>Proof : </p>
          
          <p>Other Requirements: </p>
        </div>
        <div className="footer-btn">
            <button>Verify</button>
          <button onClick={onclose} id="cancelBtn">
            Cancel
          </button>
        </div>
      </div>

    </div>
  )
};

export default PopupVerification