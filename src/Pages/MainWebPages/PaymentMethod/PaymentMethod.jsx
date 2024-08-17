import React, { useState } from "react";
import { Button, Form, Col, Row, Modal } from "react-bootstrap";
import "./PaymentMethod.css";
import visaImg1 from "../../../assets/visaImg1.png";
import masterImg2 from "../../../assets/masterImg2.jpg";


const PaymentMethod = ({ onPaymentSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCVV] = useState("");
  const [expiryDateError, setExpiryDateError] = useState("");
  const [cardNumberError,setCardNumberError] = useState("");
  const [cvvError,setCvvError] = useState("");
  const [showModal, setShowModal] = useState(false);
  

  const handlePayment = () => {

    if (cardNumber.length !== 19) { // Length 19 includes spaces
      setCardNumberError("Enter a valid card number");
      return;
  }

  // Validate expiry date
  if (expiryDate.length !== 5 || expiryDateError) { // Length 5 is MM/YY
      setExpiryDateError("Enter a valid expiry date");
      return;
  }

  // Validate CVV
  if (cvv.length !== 3) {
      alert("Enter a valid CVV");
      return;
  }
    // Validate payment method and card details
    if (paymentMethod && cardNumber && expiryDate && cvv) {
      setShowModal(true); // Simulating async payment process
    } else {
      alert("Please fill in all card details.");
    }
  };

  const confirmPayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      onPaymentSuccess();
    }, 1000); // Simulating async payment process

    setShowModal(false); // Close the modal
  };

  const getCardImage = () => {
    if (paymentMethod === "visa") {
      return visaImg1;
    } else if (paymentMethod === "mastercard") {
      return masterImg2;
    } else {
      return null;
    }
  };

  const handleCardNumberChange = (e) => {
    let inputValue = e.target.value;

    // Remove all spaces first to get the raw input
    inputValue = inputValue.replace(/\D+/g, "");

    // Format the card number: insert a space after every 4 digits
    if (inputValue.length > 0) {
      inputValue = inputValue.match(/.{1,4}/g)?.join(" ") || "";
    }

    // Set the formatted value
    setCardNumber(inputValue);

    // Show an error message if the length is less than 19 (including spaces)
    if (inputValue.length !== 19) {
      setCardNumberError("Enter a valid card number");
    } else {
      setCardNumberError(""); // Clear error message if the length is valid
    }
};


  const handleExpiryDateChange = (e) => {
    let inputValue = e.target.value;
  
    // Remove any non-digit characters
    inputValue = inputValue.replace(/\D/g, "");
  
    let formattedValue = "";
    let errorMessage = "";
  
    if (inputValue.length > 0) {
      // Extract and validate the month
      const month = inputValue.substring(0, 2);
      formattedValue = month;
  
      if (parseInt(month, 10) > 12 || month === "00") {
        errorMessage = "Enter a valid expiry date";
      }
  
      if (inputValue.length > 2) {
        // Insert the slash after the month
        formattedValue += "/";
  
        // Extract and validate the year
        const year = inputValue.substring(2, 4);
        formattedValue += year;
  
        if (parseInt(year, 10) <= 24) {
          errorMessage = "Enter a valid expiry date";
        }
      }
    }
  
    // Set the formatted value and error message
    setExpiryDate(formattedValue);
    setExpiryDateError(errorMessage);
  };

  const handleCVVChange = (e) => {
    const value = e.target.value;
    // Check if value is a 3-digit number
    if (/^\d{0,3}$/.test(value)) {
      setCVV(value);
    }
    else{
      setCvvError("enter valid cvv");
    }
  };
  
  

  return (
    <div className="Paymentpage">
      <Form.Group>
        <Form.Label>Select Payment Method:</Form.Label>
        <Form.Control
          className="mb-10"
          as="select"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="">-- Select --</option>
          <option value="visa">Visa</option>
          <option value="mastercard">Mastercard</option>
          {/* Add more payment options as needed */}
        </Form.Control>
      </Form.Group>

      {paymentMethod && (
        <Row>
          <Col sm={6}>
            <div>
              <Form.Group>
                <Form.Label>Card Number:</Form.Label>
                <Form.Control
                  type="text"
                  value={cardNumber}
                  onChange={(e) => handleCardNumberChange(e)}
                  placeholder="Enter card number"
                  maxLength={19}
                />
                 {cardNumberError && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {cardNumberError}
                  </div>
                )}
              </Form.Group>

              <Form.Group>
                <Form.Label>Expiry Date:</Form.Label>
                <Form.Control
                  type="text"
                  value={expiryDate}
                  onChange={(e) => handleExpiryDateChange(e)}
                  placeholder="MM/YY"
                  maxLength={5} // Maximum length for MM/YY format
                />
                {expiryDateError && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {expiryDateError}
                  </div>
                )}
              </Form.Group>

              <Form.Group>
                <Form.Label>CVV:</Form.Label>
                <Form.Control
                  type="text"
                  value={cvv}
                  onChange={handleCVVChange}
                  placeholder="Enter CVV"
                  maxLength="3"  // Optional: Enforces max length at the HTML level
                />
                {cvvError && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {cvvError}
                  </div>
                )}
              </Form.Group>

              <Button className="paynowbutton" onClick={handlePayment}>
                Pay Now
              </Button>
            </div>
          </Col>
          <Col sm={6}>
            <div style={{ textAlign: "center" }}>
              <img
                src={getCardImage()}
                alt="Card"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
          </Col>
        </Row>
      )}

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to confirm the booking?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmPayment}>
            Confirm Booking
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PaymentMethod;
