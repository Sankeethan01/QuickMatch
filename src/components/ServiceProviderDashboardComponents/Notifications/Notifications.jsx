// src/components/ServiceAcceptPage.js
import React, { useState } from 'react';
import './Notifications.css';

const Notification = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: 'Alice Smith',
      contactNumber: '123-456-7890',
      email: 'alice.smith@example.com',
      location: 'Colombo',
      expected_service: 'Need electrical services for my home.',
      startDate: '2024-07-01',
      endDate: '2024-07-05',
      status: ''
    },
    {
      id: 2,
      name: 'Bob Johnson',
      contactNumber: '987-654-3210',
      email: 'bob.johnson@example.com',
      location: 'Kandy',
      expected_service: 'Looking for a construction contractor.',
      startDate: '2024-07-10',
      endDate: '2024-07-20',
      status: ''
    }
    // Add more requests as needed
  ]);

  const handleAccept = (id) => {
    setRequests(requests.map(request => request.id === id ? { ...request, status: 'Accepted' } : request));
  };

  const handleDecline = (id) => {
    setRequests(requests.filter(request => request.id !== id));
  };

  return (
    <div className="service-accept-container">
      <h2>Service Requests</h2>
      <div className="requests-list">
        {requests.map(request => (
          <div key={request.id} className="request-item">
            <p><strong>Name:</strong> {request.name}</p>
            <p><strong>Contact Number:</strong> {request.contactNumber}</p>
            <p><strong>Email:</strong> {request.email}</p>
            <p><strong>Location:</strong> {request.location}</p>
            <p><strong>Expected Service:</strong> {request.expected_service}</p>
            <p><strong>Expected Service Start Date:</strong> {request.startDate}</p>
            <p><strong>Expected Service End Date:</strong> {request.endDate}</p>
            <div className="actions">
              {request.status !== 'Accepted' && (
                <>
                  <button className="accept-button" onClick={() => handleAccept(request.id)}>
                    Accept
                  </button>
                  <button className="decline-button" onClick={() => handleDecline(request.id)}>
                    Decline
                  </button>
                </>
              )}
              {request.status === 'Accepted' && (
                <span className="status accepted">Accepted</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
