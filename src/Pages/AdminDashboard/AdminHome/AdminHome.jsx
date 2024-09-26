import React, { useEffect, useState } from "react";
import "./AdminHome.css";
import AdminFeaturedInfo from "../../../components/AdminDashBoardComponents/AdminFeaturedInfo/AdminFeaturedInfo";
import AdminCharts from "../../../components/AdminDashBoardComponents/AdminCharts/AdminCharts";
import NewUsers from "../../../components/AdminDashBoardComponents/NewUsers/NewUsers";
import LatestBookings from "../../../components/AdminDashBoardComponents/LatestBookings/LatestBookings";
import NewProvider from "../../../components/AdminDashBoardComponents/NewProvider/NewProvider";
import PageTitle from "../../../components/AdminDashBoardComponents/PageTitle/PageTitle";
import AdminNavbar from "../../../components/AdminDashBoardComponents/AdminNavbar/AdminNavbar";
import { useNavigate } from "react-router-dom";
import logo from '../../../assets/logo.png';

const AdminHome = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      if(sessionStorage.getItem('user_type') !== 'admin')
        {
             sessionStorage.clear();
              navigate('/');
        }
    }, 2000);
    
   
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <img src={logo} alt="" />
        <h4>Loading......</h4>
      </div>
    );
  }
  
  return (
    <div className="admin-home">
      <AdminNavbar />
      <PageTitle heading="Overview" />
      <AdminFeaturedInfo />
      <AdminCharts
      />
      <div className="new-users-container">
        <NewUsers />
        <NewProvider />
      </div>
      <LatestBookings />
    </div>
  );
};

export default AdminHome;
