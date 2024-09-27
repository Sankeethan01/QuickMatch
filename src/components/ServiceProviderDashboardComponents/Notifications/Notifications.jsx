import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Notifications.css';
import { Button, Modal } from 'react-bootstrap';
import { toast,ToastContainer } from 'react-toastify';

const ProviderNotification = () => {
  const [requests, setRequests] = useState([]);
  const [showActionModal, setShowActionModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [actionType, setActionType] = useState('');

  useEffect(() => {
    const user_id = sessionStorage.getItem('user_id');
    if (user_id) {
      fetchBookings(user_id);
    }
  },[]);


  

  const fetchBookings = async (user_id) => {
    try {
      const response = await axios.get(`http://localhost/quickmatch_api/getBookingDetailForProvider.php?user_id=${user_id}`);
      if (response.data && Array.isArray(response.data)) {
        setRequests(response.data);
      } else {
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };

  const handleAccept = async () => {
    if (selectedBookingId) {
        try {
            const response = await axios.post('http://localhost/quickmatch_api/acceptBooking.php', {
                booking_id: selectedBookingId,
                booking_status: 'Accepted',
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log("Server Response:", response.data); // Add this line to inspect the response

            if (response.data.success) {
              toast.success("Service request accepted");
                setRequests(requests.map(request => 
                    request.booking_id === selectedBookingId ? { ...request, booking_status: 'Accepted' } : request
                ));
                setShowActionModal(false);
            } else {
              toast.error("Error occured")
                console.error("Failed to update booking status:", response.data.message || "Unknown error");
            }
        } catch (error) {
          toast.error("Error...");
            console.error("Error updating booking status:", error);
        }
    }
};



  const handleDecline = async () => {
    if (selectedBookingId) {
      try {
        const response = await axios.post('http://localhost/quickmatch_api/providerCancelBooking.php', {
          booking_id: selectedBookingId,
          booking_status1: 'Declined-provider',
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.data.success) {
          toast.warn("Service request declined");
          setRequests(requests.map(request => 
            request.booking_id === selectedBookingId ? { ...request, booking_status: 'Declined-provider' } : request
          ));
          setShowActionModal(false);
        } else {
          toast.error("Error occured...");
          console.error("Failed to update booking status:", response.data.message);
        }
      } catch (error) {
        toast("Unknown error...");
        console.error("Error updating booking status:", error);
      }
    }
  }

  const openActionModal = (id, action) => {
    setSelectedBookingId(id);
    setActionType(action);
    setShowActionModal(true);
  };

  const confirmAction = () => {
    if (actionType === 'accept') {
      handleAccept();
    } else if (actionType === 'decline') {
      handleDecline();
    }
  };

  


  return (
    <>
    <div className="service-accept-container">
      <h2>Service Requests</h2>
      <div className="requests-list">
        {requests ? requests.map(request => (
          <div key={request.booking_id} className="request-item">
             <p><strong>Customer Name :</strong> {request.customer_name}</p>
             <p><strong>Customer Email :</strong> {request.customer_email}</p>
            <p><strong>Service :</strong> {request.service}</p>
            <p><strong>Service Category :</strong> {request.service_name}</p>
            <p><strong>Service Provider:</strong> {request.provider_name}</p>
            <p><strong>Customer Location:</strong> {request.customer_address}</p>
            <p><strong>Additional Notes:</strong> {request.additional_notes}</p>
            <p><strong>Service Requested Date:</strong> {request.booking_date}</p>
             <h4>Status of the Request: <span>{request.booking_status}</span></h4>
            <div className="actions">
            {request.booking_status === 'Pending' && (
                  <>
                  <button className="accept-button" onClick={() => openActionModal(request.booking_id, 'accept')}>
                      Accept Request
                    </button>
                    <button className="decline-button" onClick={() => openActionModal(request.booking_id, 'decline')}>
                      Cancel Request
                    </button>
                  </>
                )}
                {request.booking_status === 'Declined-provider' && (
                <span style={{color: 'red'}}>Service Request Declined</span>
              )}
              {request.booking_status === 'Accepted' && (
                <span className="status accepted">Service Request Accepted</span>
              )}
            </div>
          </div>
        )):
          <div className="requests-list">
              <h1>No such notifications here</h1>
          </div>
        }
      </div>
    </div>
    <Modal show={showActionModal} onHide={() => setShowActionModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {actionType === 'accept' ? 'Confirm Acceptance' : 'Confirm Cancellation'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to {actionType === 'accept' ? 'accept' : 'decline'} this service request?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowActionModal(false)}>
            Close
          </Button>
          <Button variant={actionType === 'accept' ? 'success' : 'danger'} onClick={confirmAction}>
            {actionType === 'accept' ? 'Accept Service Booking' : 'Cancel Service Booking'}
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default ProviderNotification;