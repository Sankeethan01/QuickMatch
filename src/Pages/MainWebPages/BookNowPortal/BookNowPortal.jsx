
import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import PaymentMethod from "../PaymentMethod/PaymentMethod";
import axios from "axios";
import './BookNowPortal.css';
import { ToastContainer, toast } from "react-toastify";

const BookNowPortal = (props) => {
  const [showPayment, setShowPayment] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [error, setError] = useState(null);
  const [customer, setCustomer] = useState({});

  useEffect(() => {
      // Fetching the customer details using the user ID stored in sessionStorage
   const userId = sessionStorage.getItem('user_id');
   if (userId) {
     axios
       .get(`http://localhost/quickmatch_api/getCustomerDetail.php?user_id=${userId}`)
       .then((response) => {
         if (response.data && response.data.name) {
           setCustomer(response.data);
         }
       })
       .catch((error) => console.error("Error fetching customer details:", error));
   }

 }, [props.provider_id]);

 const handleSubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const bookingData = {
    service_category_id: props.service_category_id,
    customer_name: formData.get("name"),
    provider_Name : props.provider_name,
    customer_email: formData.get("email"),
    provider_email: props.email,
    provider_id: props.provider_id,
    customer_id: customer.user_id,
    booking_status: "Pending",
    booking_date: formData.get("date"),
    service: formData.get("service"),
    customer_address: formData.get("address"),
    additional_notes: formData.get("notes"),
  };

  setBookingDetails(bookingData);
  setShowPayment(true);
};


  const handlePaymentSuccess = async () => {
    try {
      const response = await axios.post("http://localhost/quickmatch_api/createBooking.php", bookingDetails);
      if (response.data.success) {
        toast.success("Service booked successfully.");
        setShowPayment(false);
        setBookingDetails(null);
        props.onHide();
      } else {
        setError("Failed to submit booking. Please try again later.");
      }
    } catch (error) {
      setError("An error occurred while processing your request.");
      console.error("Error:", error);
    }
  };


  const handleCancel = async () => {
      setShowPayment(false);
      setBookingDetails(null);
      props.onHide(); 
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
        {!showPayment &&  (
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="formName">
              <Form.Label column sm={3}>
                Name
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  name="name"
                  value={customer.name}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPhone">
              <Form.Label column sm={3}>
                email
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="email"
                  value={customer.email}
                  name="email"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formAddress">
              <Form.Label column sm={3}>
                Address
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  value={customer.address}
                  name="address"
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
                Describe service 
              </Form.Label>
              <Col sm={9}>
                <Form.Control type="text" name="service" placeholder="Describe wanted service" required/>
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

            {error && <p className="text-danger">{error}</p>}

            <Button className="DetailsSubmitbutton" type="submit">
              Submit
            </Button>
          </Form>
        )}
        {showPayment && (
          <PaymentMethod
            onPaymentSuccess={handlePaymentSuccess}
            onCancel={handleCancel}
            bookingData={bookingDetails}
          />
        )}
        
        {bookingDetails && (
          <div className="Bookingdetails">
            <h3>Booking Details</h3>
        
            <p>Name : {bookingDetails.customer_name}</p>
            <p>Email : {bookingDetails.customer_email}</p>
            <p>Address : {bookingDetails.customer_address}</p>
            <p>Service : {bookingDetails.service}</p>
            <p>Service Category :{props.service_name}</p>
            <p>Date : {bookingDetails.booking_date}</p>
            <p>Provider Name : {props.provider_name}</p>
            <p>Notes : {bookingDetails.additional_notes}</p>
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