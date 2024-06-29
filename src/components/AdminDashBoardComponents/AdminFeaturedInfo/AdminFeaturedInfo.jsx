import React from "react";
import "./AdminFeaturedInfo.css";
import PersonIcon from '@mui/icons-material/Person';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import WalletIcon from '@mui/icons-material/Wallet';

const AdminFeaturedInfo = () => {
  return (
    <div className="featured-info">
      <div className="featuredItem">
        <span className="featuredTitle">Customers</span>
        <div className="featuredInfoContainer">
          <span className="featuredValue">30</span>
          <PersonIcon className="customer-icon" />
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Service Providers</span>
        <div className="featuredInfoContainer">
          <span className="featuredValue">15</span>
          <ManageAccountsIcon className="provider-icon" />
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Successful Services</span>
        <div className="featuredInfoContainer">
          <span className="featuredValue">21</span>
          <AssignmentTurnedInIcon className="service-icon" />
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Total Income</span>
        <div className="featuredInfoContainer">
          <span className="featuredIncome">2500 LKR</span>
          <WalletIcon className="money-icon" />
        </div>
      </div>
    </div>
  );
};

export default AdminFeaturedInfo;
