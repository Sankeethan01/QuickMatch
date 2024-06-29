// src/components/FinancePage.js
import React from 'react';
import './Finance.css';

const FinancePage = () => {
  const payments = [
    { id: 1, customerName: 'Alice Smith', date: '2024-01-05', amount: 15000, service: 'Electrical Repairs' },
    { id: 2, customerName: 'Bob Johnson', date: '2024-01-10', amount: 20000, service: 'TV Repairs' },
    { id: 3, customerName: 'Carol White', date: '2024-01-15', amount: 10000, service: 'AC Machnie' },
    // Add more payments as needed
  ];

  const totalIncome = payments.reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="finance-container">
          <h2>Finance Page</h2>
          <div className="report-section">
        <h3>Financial Report</h3>
        <div className="report-summary">
          <p><strong>Total Income:</strong> LKR {totalIncome.toLocaleString()}</p>
          <p><strong>Number of Transactions:</strong> {payments.length}</p>
          {/* Add more summary details as needed */}
        </div>
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
