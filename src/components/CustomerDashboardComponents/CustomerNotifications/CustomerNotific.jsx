// src/components/ServiceAcceptPage.js
import React, { useState } from 'react';
import './CustomerNotific.css';
import ShowModal from '../../Write Feedback/ShowModal'

const Notification = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: 'Alice Smith',
      contactNumber: '123-456-7890',
      email: 'alice.smith@example.com',
      location: 'Colombo',
      expected_service: 'Need electrical services for my home.',
      startDate: '2024-06-27',
      endDate: '2024-07-10',
      status: ''
    },
  ]);

  const handleAccept = (id) => {
    setRequests(requests.map(request => request.id === id ? { ...request, status: 'Accepted' } : request));
  };

  const handleDecline = (id) => {
    setRequests(requests.filter(request => request.id !== id));
  };

  return (
    <>
    <div className="service-accept-container">
      <h2>Notifications</h2>
      <div className="requests-list">
        {requests.map(request => (
          <div key={request.id} className="request-item">
            <p><strong>Service :</strong> {request.expected_service}</p>
            <p><strong>Service Provider:</strong> {request.name}</p>
            <p><strong>Provider Email:</strong> {request.email}</p>
            <p><strong>My Location:</strong> {request.location}</p>
            
            <p><strong>Service Requested Date:</strong> {request.startDate}</p>
            <p><strong>Request End Date:</strong> {request.endDate}</p>
             <h4>Status of the Request: <span>Pending</span></h4>
            <div className="actions">
              {request.status !== 'Accepted' && (
                <>
                  <button className="accept-button" onClick={() => handleAccept(request.id)}>
                    Confirm Service Delivered
                  </button>
                  <button className="decline-button" onClick={() => handleDecline(request.id)}>
                   Cancel Service
                  </button>
                </>
              )}
              {request.status === 'Accepted' && (
                <span className="status accepted">Service Delivered</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className='service-accept-container'>
    <ShowModal username="Jhon Willie" email="willie45@gmail.com" user="Service User"/>
    </div>
    </>
  );
};

export default Notification;
