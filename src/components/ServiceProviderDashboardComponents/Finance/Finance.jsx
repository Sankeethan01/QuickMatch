import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Finance.css";
import financeImg from '../../../assets/finance_img.jpg'
import { toast, ToastContainer } from "react-toastify";

const FinancePage = () => {
  const [payments, setPayments] = useState([]);
  const [form, setForm] = useState({
    customerName: "",
    date: "",
    amount: "",
    service: "",
  });

  useEffect(() => {
    const fetchFinanceData = async () => {
      try {
        const user_id = sessionStorage.getItem("user_id");
        const response = await axios.get(
          `http://localhost/quickmatch_api/getFinance.php?user_id=${user_id}`
        );
        setPayments(response.data);
      } catch (error) {
        console.error("Failed to fetch finance data:", error);
      }
    };

    fetchFinanceData();
  }, []);

  const totalIncome = payments.reduce(
    (sum, payment) => sum + parseFloat(payment.amount),
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user_id = sessionStorage.getItem("user_id");
      const response = await axios.post(
        "http://localhost/quickmatch_api/addFinance.php",
        {
          user_id: user_id,
          customer_name: form.customerName,
          date: form.date,
          amount: parseFloat(form.amount),
          service: form.service,
        }
      );

      if (response.data.success) {
        toast.success("Finance added successfully..");
        const newPayment = {
          payment_id: response.data.payment_id, // assuming backend returns the new payment ID
          customer_name: form.customerName,
          date: form.date,
          amount: parseFloat(form.amount),
          service: form.service,
        };
        setPayments([newPayment, ...payments]);
        setForm({
          customerName: "",
          date: "",
          amount: "",
          service: "",
        });
      } else {
        toast.error("Error while adding finance..")
        console.error("Failed to add finance:", response.data.message);
      }
    } catch (error) {
      toast.error("Unknown error occured...")
      console.error(
        "Error adding finance:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="finance-container">
      
      <div className="finance-content">
      
      <div className="report-section">
        <h3>Financial Report</h3>
        <div className="report-summary">
          <p>
            <strong>Total Income:</strong> LKR {totalIncome.toLocaleString()}
          </p>
          <p>
            <strong>Number of Transactions:</strong> {payments.length}
          </p>
        </div>
      </div>
      <div className="form-section">
        <h3>Add Payment</h3>
        <form onSubmit={handleSubmit} className="payment-form">
          <div className="form-group">
            <label htmlFor="customerName">Customer Name:</label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={form.customerName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="service">Service:</label>
            <input
              type="text"
              id="service"
              name="service"
              value={form.service}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Add Payment
          </button>
        </form>
      </div>
      <div className="payments-section">
        <h3>Payments Received</h3>
        <ul className="payments-list">
          {payments.map((payment, index) => (
            <li key={payment.payment_id || index} className="payment-item">
              <div className="payment-info">
                <p>
                  <strong>Customer Name:</strong> {payment.customer_name}
                </p>
                <p>
                  <strong>Date:</strong> {payment.date}
                </p>
                <p>
                  <strong>Amount:</strong> LKR {payment.amount.toLocaleString()}
                </p>
                <p>
                  <strong>Service:</strong> {payment.service}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      </div>
      <div className="finance-img">
      <h2>Finance Section</h2>
        <img src={financeImg} alt="finance-img"/>
      </div>
     <ToastContainer />
    </div>
  );
};

export default FinancePage;
