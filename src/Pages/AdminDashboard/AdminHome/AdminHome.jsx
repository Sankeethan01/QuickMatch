import React, { useEffect } from "react";
import "./AdminHome.css";
import AdminFeaturedInfo from "../../../components/AdminDashBoardComponents/AdminFeaturedInfo/AdminFeaturedInfo";
import AdminCharts from "../../../components/AdminDashBoardComponents/AdminCharts/AdminCharts";
import { userData } from "../../../DummyData";
import NewUsers from "../../../components/AdminDashBoardComponents/NewUsers/NewUsers";
import LatestBookings from "../../../components/AdminDashBoardComponents/LatestBookings/LatestBookings";
import NewProvider from "../../../components/AdminDashBoardComponents/NewProvider/NewProvider";
import PageTitle from "../../../components/AdminDashBoardComponents/PageTitle/PageTitle";
import AdminNavbar from "../../../components/AdminDashBoardComponents/AdminNavbar/AdminNavbar";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {

  const navigate = useNavigate();

  useEffect(() => {
    if(sessionStorage.getItem('user_type') !== 'admin')
      {
           sessionStorage.clear();
            navigate('/');
      }
   
  }, []);
  
  return (
    <div className="admin-home">
      <AdminNavbar />

      <PageTitle heading="Overview" />
      <AdminFeaturedInfo />
      <AdminCharts
        data={userData}
        title="User Analytics"
        grid
        dataKey="Active User"
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
