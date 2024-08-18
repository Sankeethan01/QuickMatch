import React, { useEffect, useState } from "react";
import "./AdminFeaturedInfo.css";
import PersonIcon from '@mui/icons-material/Person';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import WalletIcon from '@mui/icons-material/Wallet';
import axios from "axios";
import CountUp from 'react-countup';
import logo from '../../../assets/logo.png';

const AdminFeaturedInfo = () => {
  const [customerCount, setCustomerCount] = useState(0);
  const [providerCount, setProviderCount] = useState(0);
  const [successfulServices, setSuccessfulServices] = useState(0);
  const [income, setIncome] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomerCount();
    fetchSuccessfulServiceCount();
    fetchProviderCount();
    fetchTotalIncome();
  }, []);

  const fetchCustomerCount = async () => {
    try {
      const response = await axios.get("http://localhost/quickmatch_api/getUserCount.php?user_type=customer");
      setLoading(false);
      setCustomerCount(response.data.user_count);
    } catch (error) {
      console.error("Error fetching customer count:", error);
      setLoading(false);
    }
  };

  const fetchSuccessfulServiceCount = async () => {
    try {
      const response = await axios.get("http://localhost/quickmatch_api/getSuccessServiceCount.php?booking_status=Completed");
      setLoading(false);
      setSuccessfulServices(response.data.success_count);
    } catch (error) {
      console.error("Error fetching successful service count:", error);
      setLoading(false);
    }
  };

  const fetchProviderCount = async () => {
    try {
      const response = await axios.get("http://localhost/quickmatch_api/getUserCount.php?user_type=provider");
      setLoading(false);
      setProviderCount(response.data.user_count);
    } catch (error) {
      console.error("Error fetching provider count:", error);
      setLoading(false);
    }
  };

  const fetchTotalIncome = async () => {
    try {
      const response = await axios.get("http://localhost/quickmatch_api/getTotalIncome.php?action=totalIncome");
      setLoading(false);
      setIncome(response.data.total_income);
    } catch (error) {
      console.error("Error fetching total income:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <img src={logo} alt="Loading..." />
        <h4>Loading......</h4>
      </div>
    );
  }

  return (
    <div className="featured-info">
      <div className="featuredItem">
        <span className="featuredTitle">Customers</span>
        <div className="featuredInfoContainer">
          <CountUp start={0} end={customerCount} duration={2} className="featuredValue" />
          <PersonIcon className="customer-icon" />
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Service Providers</span>
        <div className="featuredInfoContainer">
          <CountUp start={0} end={providerCount} duration={2} className="featuredValue" />
          <ManageAccountsIcon className="provider-icon" />
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Successful Services</span>
        <div className="featuredInfoContainer">
          <CountUp start={0} end={successfulServices} duration={2} className="featuredValue" />
          <AssignmentTurnedInIcon className="service-icon" />
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Total Income</span>
        <div className="featuredInfoContainer">
          <CountUp start={0} end={income} duration={2} prefix="LKR " className="featuredIncome" />
          <WalletIcon className="money-icon" />
        </div>
      </div>
    </div>
  );
};

export default AdminFeaturedInfo;
