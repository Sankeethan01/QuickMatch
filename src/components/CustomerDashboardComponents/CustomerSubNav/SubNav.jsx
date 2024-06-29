import React from 'react'
import '../../ServiceProviderDashboardComponents/ProviderSubNavbar/ProviderSubNav.css';
import { Link } from "react-router-dom";

const SubNav = () => {
  return (
    <nav className="nav-bar-pro-sub">
    <Link className="nav-link-1" to="/customerhome">
      Profile Settings
    </Link>

    <Link className="nav-link-1" to="/customernotifications">
      Notification
    </Link>
    
  </nav>
  )
}

export default SubNav
