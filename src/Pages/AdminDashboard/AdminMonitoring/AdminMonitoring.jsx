import React, { useEffect, useState } from "react";
import "./AdminMonitoring.css";
import PageTitle from "../../../components/AdminDashBoardComponents/PageTitle/PageTitle";
import AdminNavbar from "../../../components/AdminDashBoardComponents/AdminNavbar/AdminNavbar";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import logo from '../../../assets/logo.png';
import customerimg from '../../../assets/customer_monitorimg.jpg';
import providerimg from '../../../assets/provider monitor.jpg'
import Footer from "../../../components/Footer/Footer";

const AdminMonitoring = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("user_type") !== "admin") {
      sessionStorage.clear();
      navigate("/");
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const switchToUserType = (type) => {
    setLoading(false);
    sessionStorage.setItem("previous_user_type", "admin"); // Store admin type
    sessionStorage.setItem("user_type", type); // Switch to customer or provider
    if (type === "customer") {
      navigate("/home");
    } else if (type === "provider") {
      navigate("/providerintro");
    }
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
    <>
    <div className="admin-monitoring">
      <AdminNavbar />
      <PageTitle heading="Monitoring Section" />
      <div className="cards-container">
        <Card className="monitoring-card">
          <Card.Body>
            <Card.Title>Customer Zone</Card.Title>
            <img src={customerimg} />
            <Card.Text>
              Switch to the customer view to ensure the customer dashboard is
              functioning correctly.
            </Card.Text>
           
            <Button
              variant="primary"
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  switchToUserType("customer");
                }, 3000);}}
            >
              Switch as Customer
            </Button>
          </Card.Body>
        </Card>

        <Card className="monitoring-card">
          <Card.Body>
            <Card.Title>Provider Dashboard</Card.Title>
            <img src={providerimg} />
            <Card.Text>
              Switch to the provider view to ensure the provider dashboard is
              functioning correctly.
            </Card.Text>
            
            <Button
              variant="primary"
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  switchToUserType("provider");
                }, 3000);}}
            >
              Switch as Provider
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default AdminMonitoring;
