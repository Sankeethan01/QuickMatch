import React, { useState } from "react";
import './BookNowPortal.css'
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import PaymentMethod from "../PaymentMethod/PaymentMethod";

const BookNowPortal = (props) => {

    const [showPayment, setShowPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Simulate form submission and API call to book
    const formData = new FormData(event.target);
    const bookingData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      date: formData.get("date"),
      time: formData.get("time"),
      address: formData.get("address"),
      notes: formData.get("notes"),
      providerName: props.providerName
    };

    // Simulate API call or processing
    setTimeout(() => {
      // Assuming payment is required after form submission
      setShowPayment(true);
      // Save booking details for display
      setBookingDetails(bookingData);
    }, 1000); // Simulating async API call

    // Reset form fields (optional)
    event.target.reset();
  };

  const handlePaymentSuccess = () => {
    // Simulate payment success
    setPaymentSuccess(true);
  };

  const handleBookingConfirm = () => {
    
    setShowPayment(false);
    setPaymentSuccess(false);
    setBookingDetails(null);

    props.onHide(); 
  };

     
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Book Now</Modal.Title>
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

            <Form.Group as={Row} className="mb-3" controlId="formEmail">
              <Form.Label column sm={3}>
                Email
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  name="email"
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
                Booking Date
              </Form.Label>
              <Col sm={9}>
                <Form.Control type="date" name="date" required />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formTime">
              <Form.Label column sm={3}>
                Booking Time
              </Form.Label>
              <Col sm={9}>
                <Form.Control type="time" name="time" required />
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
                Additional Notes
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter any additional notes"
                  name="notes"
                />
              </Col>
            </Form.Group>

            <Button className="DetailsSubmitbutton" type="submit">
              Submit
            </Button>
          </Form>
        )}

        {showPayment && !paymentSuccess && (
          <PaymentMethod onPaymentSuccess={handlePaymentSuccess} />
        )}

        {paymentSuccess && (
          <div>
            <p>Payment Successful!</p>
            <Button className="payconfirmbutton" onClick={handleBookingConfirm}>Confirm Booking</Button>
          </div>
        )}

        {bookingDetails && (
          <div className="Bookingdetails">
            <h3>Booking Details</h3>
            <p>Name: {bookingDetails.name}</p>
            <p>Email: {bookingDetails.email}</p>
            <p>Phone: {bookingDetails.phone}</p>
            <p>Date: {bookingDetails.date}</p>
            <p>Time: {bookingDetails.time}</p>
            <p>Address: {bookingDetails.address}</p>
            <p>Notes: {bookingDetails.notes}</p>
            <p>Provider Name: {bookingDetails.providerName}</p>
            <p>Booking Fee : Rs 200</p>
            <p className="payment-instructions">*If the provider declines or does not accept your service within 2 weeks, we will refund   &nbsp;&nbsp;your amount. Otherwise, the payment will not be refunded to you.</p>
          </div>
        )}
      </Modal.Body>
    </Modal>
  )
}

export default BookNowPortal