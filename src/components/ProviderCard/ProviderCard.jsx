import React from "react";
import "./ProviderCard.css";
import { Button } from "react-bootstrap";

const ProviderCard = ({ user, onShowModal }) => {
  const profileImageUrl =
    user.profile_image && (user.profile_image instanceof File
      ? URL.createObjectURL(user.profile_image)
      : `http://localhost/quickmatch_api/profile_images/${user.profile_image}`);

  return (
    <div className="provider-card">
      <div className="root-card">
        <div className="card-container">
          <span className={user.status ? "pro online" : "pro offline"}>
            {user.status ? "Online" : "Offline"}
          </span>
          <img src={profileImageUrl} className="card-img" alt="user" />
          <h3>{user.name}</h3>
          <h4>{user.address}</h4>
          <h6>{user.services}</h6>
          <p className="experience">{user.description}</p>
          <Button onClick={() => onShowModal(user)} className="primary">
            Get Info
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProviderCard;
//#060b2695