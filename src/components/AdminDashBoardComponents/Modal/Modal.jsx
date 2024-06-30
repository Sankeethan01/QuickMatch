import React from "react";
import "./Modal.css";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailIcon from "@mui/icons-material/Email";
import ClearIcon from "@mui/icons-material/Clear";

const Modal = ({ setOpenModal, avatar, name, username, email }) => {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <ClearIcon
            className="cancel-btn"
            onClick={() => {
              setOpenModal(false);
            }}
          />
        </div>
        <div className="title">
          <img src={avatar} alt="" />
          <h3>{name}</h3>
          <p>Admin</p>
        </div>
        <div className="body">
          <p className="small-head">Account Details</p>
          <p>
            <PersonOutlineIcon className="icon" />
            {username}
          </p>
          <p>
            <EmailIcon className="icon" />
            {email}
          </p>
        </div>
        <div className="footer-btn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
