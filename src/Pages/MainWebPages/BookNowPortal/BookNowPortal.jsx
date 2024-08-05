
import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import PaymentMethod from "../PaymentMethod/PaymentMethod";
import axios from "axios";
import './BookNowPortal.css';
import { ToastContainer, toast } from "react-toastify";

const BookNowPortal = (props) => {
  const [showPayment, setShowPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [bookingId, setBookingId] = useState(null); // Store booking ID for potential deletion
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const bookingData = {
      service_category_id: props.service_category_id,
      customer_name: formData.get("name"),
      provider_id: props.provider_id,
      booking_status: "Pending",
      phone: formData.get("phone"),
      booking_date: formData.get("date"),
      booking_time: formData.get("time"),
      customer_address: formData.get("address"),
      additional_notes: formData.get("notes"),
    };

    try {
      const response = await axios.post("http://localhost/quickmatch_api/bookingDetails.php", bookingData);
      if (response.data.success) {
        setBookingDetails(bookingData);
        setBookingId(response.data.booking_id); // Store booking ID
        setShowPayment(true);
      } else {
        setError("Failed to submit booking. Please try again later.");
      }
    } catch (error) {
      setError("An error occurred while processing your request.");
      console.error("Error:", error);
    }
  };

  const handlePaymentSuccess = () => {
    setPaymentSuccess(true);
    setShowPayment(false);
    toast.success("Provider data deleted Successfully..");
  };

  const handleBookingConfirm = () => {
    setPaymentSuccess(false);
    setBookingDetails(null);
    props.onHide();
  };

  const handleCancel = async () => {
    try {
      if (bookingId) {
        await axios.delete(`http://localhost/quickmatch_api/bookingDetails.php?id=${bookingId}`);
      }
      
      setShowPayment(false);
      setBookingDetails(null);
      setBookingId(null);
    
      props.onHide();
      
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Modal className="book-now"
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
   
    >
      <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter">Book Now</Modal.Title>
        <button type="button" class="btn-close" aria-label="Close"  onClick={handleCancel}></button>
      </Modal.Header>
      <Modal.Body className="BookingDetails">
        {!showPayment && !paymentSuccess && (
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="formName">
              <Form.Label column sm={3}>
                Name
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPhone">
              <Form.Label column sm={3}>
                Phone
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="tel"
                  placeholder="Enter your phone number"
                  name="phone"
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formDate">
              <Form.Label column sm={3}>
                Service Date
              </Form.Label>
              <Col sm={9}>
                <Form.Control type="date" name="date" required />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formTime">
              <Form.Label column sm={3}>
                Service Time
              </Form.Label>
              <Col sm={9}>
                <Form.Control type="time" name="time" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formAddress">
              <Form.Label column sm={3}>
                Address
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder="Enter your address"
                  name="address"
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formNotes">
              <Form.Label column sm={3}>
                Exact Service
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter any additional notes"
                  name="notes" required
                />
              </Col>
            </Form.Group>

            {error && <p className="text-danger">{error}</p>}

            <Button className="DetailsSubmitbutton" type="submit">
              Submit
            </Button>
          </Form>
        )}
        {showPayment && !paymentSuccess && (
          <PaymentMethod
            onPaymentSuccess={handlePaymentSuccess}
            onCancel={handleCancel}
          />
        )}
        {paymentSuccess && (
          <div>
            <h4>Payment Successful!</h4>
            <Button variant="success" onClick={handleBookingConfirm}>
              Confirm Booking
            </Button>
          </div>
          
        )}
        
        {bookingDetails && (
          <div className="Bookingdetails">
            <h3>Booking Details</h3>
        
            <p>Name: {bookingDetails.customer_name}</p>
            <p>Phone: {bookingDetails.phone}</p>
            <p>Date: {bookingDetails.booking_date}</p>
            <p>Time: {bookingDetails.booking_time}</p>
            <p>Address: {bookingDetails.customer_address}</p>
            <p>Notes: {bookingDetails.additional_notes}</p>
            <p>Provider Name: {props.provider_name}</p>
            <p>Service Category :{props.service_name}</p>
            <p>Booking Status: {bookingDetails.booking_status}</p>
            <p>Booking Fee : Rs 500</p>
            <p className="payment-instructions">*If the provider declines or does not accept your service within 2 weeks, we will refund   &nbsp;&nbsp;your amount. Otherwise, the payment will not be refunded to you.</p>
          </div>
        )}

        {error && (
          <div className="error-message">{error}</div>
        )}
      </Modal.Body>
      <ToastContainer />
    </Modal>
  );
};

export default BookNowPortal;