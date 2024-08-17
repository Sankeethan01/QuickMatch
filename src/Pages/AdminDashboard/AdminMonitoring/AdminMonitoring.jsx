import React, { useEffect } from "react";
import "./AdminMonitoring.css";
import PageTitle from "../../../components/AdminDashBoardComponents/PageTitle/PageTitle";
import AdminNavbar from "../../../components/AdminDashBoardComponents/AdminNavbar/AdminNavbar";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

const AdminMonitoring = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("user_type") !== "admin") {
      sessionStorage.clear();
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const switchToUserType = (type) => {
    sessionStorage.setItem("previous_user_type", "admin"); // Store admin type
    sessionStorage.setItem("user_type", type); // Switch to customer or provider
    if (type === "customer") {
      navigate("/home");
    } else if (type === "provider") {
      navigate("/providerintro");
    }
  };

  return (
    <div className="admin-monitoring">
      <AdminNavbar />

      <PageTitle heading="Monitoring Section" />
      <div className="cards-container">
        <Card className="monitoring-card">
          <Card.Body>
            <Card.Title>Customer Zone</Card.Title>
            <Card.Text>
              Switch to the customer view to ensure the customer dashboard is
              functioning correctly.
            </Card.Text>
            <Button
              variant="primary"
              onClick={() => switchToUserType("customer")}
            >
              Switch as Customer
            </Button>
          </Card.Body>
        </Card>

        <Card className="monitoring-card">
          <Card.Body>
            <Card.Title>Provider Dashboard</Card.Title>
            <Card.Text>
              Switch to the provider view to ensure the provider dashboard is
              functioning correctly.
            </Card.Text>
            <Button
              variant="primary"
              onClick={() => switchToUserType("provider")}
            >
              Switch as Provider
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default AdminMonitoring;
