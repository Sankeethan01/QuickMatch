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
        </div>
        <div className="body">
          <p className="small-head">Required Details</p>
             <div className="info">
             <p>User: {data.user}</p>
            <p>Username : {data.username} </p>
            <p>Email : {data.email}</p>
            <p>Date : {data.date}</p>
             </div>
            
         
        </div>

        <div className="body">
          <p className="small-head">Feedback</p>

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
  );
};

export default PopupFeedback;
