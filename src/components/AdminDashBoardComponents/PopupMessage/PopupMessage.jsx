import React from 'react'
import './PopupMessage.css'
import ClearIcon from "@mui/icons-material/Clear";

const PopupMessage = ({ data, onclose }) => {
  return (
    <div className="popup-feedback" open onclose={onclose}>
      <div className="popup-box">
        <div className="titleCloseBtn">
          <ClearIcon className="cancel-btn" onClick={onclose} />
        </div>
        <div className="title">
          <h3>Messages</h3>
          <p>Message Id : {data.id}</p>
        </div>
        <div className="body">
          <p className="small-head">Required Details</p>
             <div className="info">
            <p>Name : {data.username} </p>
            <p>Email : {data.email}</p>
            <p>Date : {data.date}</p>
             </div>
            
         
        </div>

        <div className="body">
          <p className="small-head">Message</p>

          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat
            corrupti id eos ipsa suscipit illo autem excepturi nobis dolorum ex
            maxime voluptate, eius recusandae modi repudiandae possimus tenetur
            incidunt? Earum!
          </p>
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

export default PopupMessage