import React from "react";
import "./PopupFeedback.css";
import ClearIcon from "@mui/icons-material/Clear";

const PopupFeedback = ({ data, onclose }) => {
  return (
    <div className="popup-feedback" open onclose={onclose}>
      <div className="popup-box">
        <div className="titleCloseBtn">
          <ClearIcon className="cancel-btn" onClick={onclose} />
        </div>
        <div className="title">
          <h3>Feedbacks</h3>
          <p>Feedback Id : {data.id}</p>
          <p>User Type : {data.user_type}</p>
        </div>
        <div className="body">
          <p className="small-head">Required Details</p>
             <div className="info">
             <p>User: {data.name}</p>
              
            <p>Email : {data.email}</p>
            <p>Date : {data.date}</p>
             </div>
            
         
        </div>

        <div className="body-feed">
          <p className="small-head">Feedback</p>

          <p>
          {data.feedback}
          </p>
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

export default PopupFeedback;
