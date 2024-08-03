import React from "react";
import "./Popup.css";
import ClearIcon from "@mui/icons-material/Clear";

const Popup = ({ data, onclose }) => {
  return (
    <div className="popup" open onclose={onclose}>
      <div className="popup-box">
        <div className="titleCloseBtn">
          <ClearIcon className="cancel-btn" onClick={onclose} />
        </div>
        <div className="title">
          <h3>Service Booking Details</h3>
          <p>Booking Id : {data.id}</p>
          <p>Booked Date : {data.date}</p>
        </div>
        <div className="body">
          <p className="small-head">Required Details</p>
          <p>Service  : {data.service} </p>
          <p>Customer : {data.customer}</p>
          <p>Provider : {data.provider}</p>
          <p>Status : {data.status}</p>
        </div>
        <div className="footer-btn">
          <button onClick={onclose} id="cancelBtn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
