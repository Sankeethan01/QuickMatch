import React from "react";
import "./ProviderSubNav.css";
import { Link } from "react-router-dom";

const ProviderSubNav = () => {
  return (
    <nav className="nav-bar-pro-sub">
      <Link className="nav-link-1" to="/providerhome">
        Profile
      </Link>

      <Link className="nav-link-1" to="/providernotifications">
        Notification
      </Link>
      <Link className="nav-link-1" to="/providerfinance">
        Finance
      </Link>
      <Link className="nav-link-1" to="/providerfeedback">
        Feedback
      </Link>
    </nav>
  );
};

export default ProviderSubNav;
