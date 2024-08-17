import React, { useEffect, useState } from "react";
import "./AdminFeaturedInfo.css";
import PersonIcon from '@mui/icons-material/Person';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import WalletIcon from '@mui/icons-material/Wallet';
import axios from "axios";
import logo from '../../../assets/logo.png';

const AdminFeaturedInfo = () => {

  const [customerCount, setCustomerCount] = useState(null);
  const [providerCount, setProviderCount] = useState(null);
  const [successfulServices,setSuccessfulServices] = useState(null);
  const [income,setIncome] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomerCount();
    fetchSuccessfulServiceCount();
    fetchProviderCount();
    fetchTotalIncome();
  }, []);

  const fetchCustomerCount = async () => {
    axios
      .get("http://localhost/quickmatch_api/getUserCount.php?user_type=customer")
      .then((response) => {
        console.log(response.data);
        setLoading(false);
           setCustomerCount(response.data.user_count)
      })
      .catch((error) => {
        console.error("Error fetching  customer count : ", error);
        setLoading(false);
      });
  };

  const fetchSuccessfulServiceCount = async () => {
    axios
      .get("http://localhost/quickmatch_api/getSuccessServiceCount.php?booking_status=Completed")
      .then((response) => {
        console.log(response.data);
        setLoading(false);
           setSuccessfulServices(response.data.success_count)
      })
      .catch((error) => {
        console.error("Error fetching  successful service count : ", error);
        setLoading(false);
      });
  };

  const fetchProviderCount = async () => {
    axios
      .get("http://localhost/quickmatch_api/getUserCount.php?user_type=provider")
      .then((response) => {
        console.log(response.data);
        setLoading(false);
           setProviderCount(response.data.user_count)
      })
      .catch((error) => {
        console.error("Error fetching  provider count : ", error);
        setLoading(false);
      });
  };

  const fetchTotalIncome = async () => {
    axios
      .get("http://localhost/quickmatch_api/getTotalIncome.php?action=totalIncome")
      .then((response) => {
        console.log(response.data);
        setLoading(false);
           setIncome(response.data.total_income)
      })
      .catch((error) => {
        console.error("Error fetching  provider count : ", error);
        setLoading(false);
      });
  };



  if (loading) {
    return (
      <div className="loading">
        <img src={logo} alt="" />
        <h4>Loading......</h4>
      </div>
    );
  }
  return (
    <div className="featured-info">
      <div className="featuredItem">
        <span className="featuredTitle">Customers</span>
        <div className="featuredInfoContainer">
          <span className="featuredValue">{customerCount}</span>
          <PersonIcon className="customer-icon" />
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Service Providers</span>
        <div className="featuredInfoContainer">
          <span className="featuredValue">{providerCount}</span>
          <ManageAccountsIcon className="provider-icon" />
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Successful Services</span>
        <div className="featuredInfoContainer">
          <span className="featuredValue">{successfulServices}</span>
          <AssignmentTurnedInIcon className="service-icon" />
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Total Income</span>
        <div className="featuredInfoContainer">
          <span className="featuredIncome">{income} LKR</span>
          <WalletIcon className="money-icon" />
        </div>
      </div>
    </div>
  );
};

export default AdminFeaturedInfo;
