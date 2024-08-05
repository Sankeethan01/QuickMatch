import React, { useState } from 'react';
import './Finance.css';

const FinancePage = () => {
  const [payments, setPayments] = useState([
    { id: 1, customerName: 'Alice Smith', date: '2024-01-05', amount: 15000, service: 'Electrical Repairs' },
    { id: 2, customerName: 'Bob Johnson', date: '2024-01-10', amount: 20000, service: 'TV Repairs' },
    { id: 3, customerName: 'Carol White', date: '2024-01-15', amount: 10000, service: 'AC Machine' },
    // Add more payments as needed
  ]);

  const [form, setForm] = useState({
    customerName: '',
    date: '',
    amount: '',
    service: ''
  });

  const totalIncome = payments.reduce((sum, payment) => sum + payment.amount, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPayment = {
      id: payments.length + 1,
      customerName: form.customerName,
      date: form.date,
      amount: parseFloat(form.amount),
      service: form.service
    };
    setPayments([newPayment, ...payments]);
    setForm({
      customerName: '',
      date: '',
      amount: '',
      service: ''
    });
  };

  return (
    <div className="finance-container">
      <h2>Finance Page</h2>
      <div className="report-section">
        <h3>Financial Report</h3>
        <div className="report-summary">
          <p><strong>Total Income:</strong> LKR {totalIncome.toLocaleString()}</p>
          <p><strong>Number of Transactions:</strong> {payments.length}</p>
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
          <button type="submit" className="submit-button">Add Payment</button>
        </form>
      </div>
      <div className="payments-section">
        <h3>Payments Received</h3>
        <ul className="payments-list">
          {payments.map(payment => (
            <li key={payment.id} className="payment-item">
              <div className="payment-info">
                <p><strong>Customer Name:</strong> {payment.customerName}</p>
                <p><strong>Date:</strong> {payment.date}</p>
                <p><strong>Amount:</strong> LKR {payment.amount.toLocaleString()}</p>
                <p><strong>Service:</strong> {payment.service}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FinancePage;