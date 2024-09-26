// src/components/ServiceAcceptPage.js
import React, { useEffect, useState } from 'react';
import './CustomerNotific.css';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

const Notification = () => {
  const [requests, setRequests] = useState([]);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  useEffect(() => {
    const user_id = sessionStorage.getItem('user_id');
    if (user_id) {
      fetchBookings(user_id);
    }
  },[]);

  const fetchBookings = async (user_id) => {
    try {
      const response = await axios.get(`http://localhost/quickmatch_api/getBookingDetailForCustomer.php?user_id=${user_id}`);
      if (response.data && Array.isArray(response.data)) {
        setRequests(response.data);
      } else {
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };

  const handleAccept = async (id) => {
    try {
      console.log(id);
      const response = await axios.post('http://localhost/quickmatch_api/confirmBookingStatus.php', {
        booking_id: id,
        booking_status: 'Completed',
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setRequests(requests.map(request => 
          request.booking_id === id ? { ...request, booking_status: 'Completed' } : request
        ));
      } else {
        console.error("Failed to update booking status:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };


  const handleDecline = async () => {
    if (selectedBookingId) {
      try {
        const response = await axios.post('http://localhost/quickmatch_api/customerCancelBooking.php', {
          booking_id: selectedBookingId,
          booking_status: 'Declined-customer',
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.data.success) {
          setRequests(requests.map(request => 
            request.booking_id === selectedBookingId ? { ...request, booking_status: 'Declined-customer' } : request
          ));
          setShowCancelModal(false);
        } else {
          console.error("Failed to update booking status:", response.data.message);
        }
      } catch (error) {
        console.error("Error updating booking status:", error);
      }
    }
  }

  const openCancelModal = (id) => {
    setSelectedBookingId(id);
    setShowCancelModal(true);
  };

  return (
    <>
    <div className="service-accept-container">
      <h2>Service Notifications</h2>
      <div className="requests-list">
        {requests.length > 0 ? requests.map(request => (
          <div key={request.booking_id} className="request-item">
             <p><strong>Customer Name :</strong> {request.customer_name}</p>
            <p><strong>Service :</strong> {request.service}</p>
            <p><strong>Service Category :</strong> {request.service_name}</p>
            <p><strong>Service Provider:</strong> {request.provider_name}</p>
            <p><strong>Provider Email :</strong> {request.provider_email}</p>
            <p><strong>My Location:</strong> {request.customer_address}</p>
            <p><strong>Additional Notes:</strong> {request.additional_notes}</p>
            <p><strong>Service Requested Date:</strong> {request.booking_date}</p>
             <h4>Status of the Request: <span>{request.booking_status}</span></h4>
            <div className="actions">
            {request.booking_status === 'Pending' && (
                  <>
                    <button className="decline-button" onClick={() => openCancelModal(request.booking_id)}>
                      Cancel Booking
                    </button>
                  </>
                )}
              {request.booking_status === 'Accepted' && (
                <>
                  <button className="accept-button" onClick={() => handleAccept(request.booking_id)}>
                    Confirm Service Delivered
                  </button>
                </>
              )}
              {request.booking_status === 'Completed' && (
                <span className="status accepted">Service Delivered</span>
              )}
              {request.booking_status === 'Declined-customer' && (
                <span style={{color: 'red'}}>Service Booking canceled</span>
              )}
            </div>
          </div>
         
        )):
         <div className='request-item'>
          <h1 style={{textAlign:'center'}}>No such Notifications found</h1>
         </div>
        }
      </div>
    </div>
     <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Cancellation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to cancel this service Booking? 
          <p style={{color: 'red'}}>If you cancel the booking, booking fee you paid will not be refunded..</p></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDecline}>
            Cancel Service Booking
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Notification;
