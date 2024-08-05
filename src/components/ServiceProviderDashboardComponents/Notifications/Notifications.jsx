import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Notifications.css';

const Notification = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost/quickmatch_api/providerDetails.php?action=getProviderBookingsById&provider_id=501');
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const updateBookingStatus = async (booking_id, status) => {
    try {
      const response = await axios.post('http://localhost/quickmatch_api/providerDetails.php', {
        action: 'updateStatus',
        provider_id: 501,
        booking_id: booking_id,
        status: status
      });
      if (response.status === 200) {
        // Remove the updated booking from the state
        setRequests(prevRequests => prevRequests.filter(request => request.booking_id !== booking_id));
      }
    } catch (error) {
      console.error(`Error updating booking status to ${status}:`, error);
    }
  };

  const handleAccept = (id) => {
    updateBookingStatus(id, 'Accepted');
  };

  const handleDecline = (id) => {
    updateBookingStatus(id, 'Declined');
  };

  return (
    <div className="service-accept-container">
      <h2>Service Requests</h2>
      <div className="requests-list">
        {requests.length === 0 ? (
          <p className="no-pending-requests">No pending requests.</p>
        ) : (
          requests.map(request => (
            <div key={request.booking_id} className="request-item">
              <p><strong>Customer Name:</strong> {request.customer_name}</p>
              <p><strong>Address:</strong> {request.customer_address}</p>
              <p><strong>Expected Service Date:</strong> {request.booking_date}</p>
              <p><strong>Expected Service:</strong> {request.additional_notes}</p>
              <div className="actions">
                {request.booking_status !== 'Accepted' && request.booking_status !== 'Declined' && (
                  <>
                    <button className="accept-button" onClick={() => handleAccept(request.booking_id)}>
                      Accept
                    </button>
                    <button className="decline-button" onClick={() => handleDecline(request.booking_id)}>
                      Decline
                    </button>
                  </>
                )}
                {request.booking_status === 'Accepted' && (
                  <span className="status accepted">Accepted</span>
                )}
                {request.booking_status === 'Declined' && (
                  <span className="status declined">Declined</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notification;