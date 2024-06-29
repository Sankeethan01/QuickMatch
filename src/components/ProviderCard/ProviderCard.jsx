import React from "react";
import "./ProviderCard.css";
import { Button } from "react-bootstrap";

const ProviderCard = ({ user, onShowModal }) => {
  return (
    <div className="provider-card">
      <div className="root-card">
        <div className="card-container">
          <span className={user.online ? "pro online" : "pro offline"}>
            {user.online ? "Online " : "Offline"}
          </span>
          <img src={user.profile} className="card-img" alt="user" />
          <h3>{user.name}</h3>
          <h4>{user.city}</h4>
          <h5>{user.desc}</h5>
          <p className="experience">{user.exp}</p>
          <Button onClick={() => onShowModal(user)} className="primary">
            Get Info
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProviderCard;
