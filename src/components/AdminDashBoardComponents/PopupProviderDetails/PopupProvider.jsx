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
        </div>
        <div className='body'>
        <p className="small-head">Required Details</p>
        <div className='info'>
        <img src={data.avatar} alt="" />
        
        <div className=''>
        <h3>{data.username}</h3>
         <p>{data.email} </p>
          <p>{data.address}</p>
          <p>{data.service}</p>
        </div>
        </div>
        </div>
        
        <div className="body">
          <p className="small-head">Additional Details</p>
          
          <p>Status : {data.status}</p>
          
          <p>Experience : {data.experience}</p>
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